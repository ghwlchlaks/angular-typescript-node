import axios, {AxiosError, AxiosResponse } from 'axios';
import { Request, Response } from 'express';

import * as PfortNiteApi from '../config/fortnite-api';
import fortniteModel, { IUserStatsModel } from '../models/fortniteModel';
import top10, {ITop10} from '../models/rankingModel';

import { IGetTop10, IGetUserId, IGetUserStats} from '../types/fortnite-types';

/* user 기본 아이디 가져오기 api */
export let getUserId = (req: Request, res: Response) => {
    const userId: string = req.query.userId;

    const main = async () => {
        const data: IGetUserId = await callGetUserIdApi(userId);
        return data;
    };

    main().then((result: any) => {
        if (result) {
            res.send(result);
        } else {
            res.send(null);
        }
    }).catch((err) => {
        console.error(err);
    });
};

/* user 기본 아이디 가져오기 api 요청*/
const callGetUserIdApi = async (userId: string): Promise<IGetUserId>  => {
    let result: Promise<IGetUserId>;
    return await axios.get(PfortNiteApi.PGetUserId, {
        params: {
            username: userId,
        },
    }).then((response: AxiosResponse) => {
        result = response.data;
        if (response.data && response.status >= 200 && response.status < 300) {
            if (response.data.error) {
                return null;
            } else {
                return result;
            }
        } else {
            return null;
        }
    }).catch((error: AxiosError) => {
        console.error(error);
        return result;
    });
};

/* userstats call api 요청 */
const callGetUserStatsApi = async (id: string, plat: string): Promise<IGetUserStats> => {
    let result: Promise<IGetUserStats>;
    return await axios.get(PfortNiteApi.PGetUserStats, {
        params: {
            platform: plat,
            user_id: id,
        },
    }).then((response: AxiosResponse) => {
        if (response.data && response.status >= 200 && response.status < 300) {
            result = response.data;
            if (response.data.error) {
                return null;
            } else {
                return result;
            }
        } else {
            console.log('error');
            return null;
        }
    }).catch((error: AxiosError) => {
        console.error(error);
        return result;
    });
};

/* userstats 구하는 api */
export let getUserStats = (req: Request, res: Response) => {
    const userId: string = req.query.userId;
    let platform: string = req.query.platform;
    if (platform === 'XBOX') {
        platform = 'XB1';
    }
    const main = async (): Promise<IUserStatsModel> => {

        // id 검사 대소문자 구별x
        const checkId: IUserStatsModel = await fortniteModel.findOne({
            username: {$regex: userId, $options: 'i'},
        }).findOne({
            platform: {$regex: platform, $options: 'i'},
        });
        console.log(checkId);
        let userIdApiData: IGetUserId;
        let userStatsApiData: IGetUserStats;

        if (checkId) {
            // id 존재 할 떄
            // 1분
            const checkTime: IGetUserStats =
                await fortniteModel.findOne({lastupdate : {$lte: (Date.now() - ( 1 * 60 * 1000 ))}});
            console.log(checkTime);
            if (!checkTime) {
                // 시간안에 요청시
                // db값 주기
                return checkId;
            } else {
                // 시간 밖에 요청시
                // api 이용
                userIdApiData = await callGetUserIdApi(userId);
                userStatsApiData = await callGetUserStatsApi(userIdApiData.uid, platform);
                // db 갱신 및 현재시간 저장
                return updateStats(userIdApiData, userStatsApiData);
            }
        } else {
            // id 존재 안 할 때
            // api 이용
            // 찾고자하는 유저가 없을떄 null 반환
            userIdApiData = await callGetUserIdApi(userId);
            if (!userIdApiData) {
                return;
            }
            userStatsApiData = await callGetUserStatsApi(userIdApiData.uid, platform);
            // db 생성
            if (!userStatsApiData) {
                return;
            }
            return createStats(userIdApiData, userStatsApiData);
        }
    };

    main().then((result: IUserStatsModel) => {
        if (result) {
            res.send({status: true, value: result});
        } else {
            res.send({status: false, msg: 'no user!'});
        }
    }).catch((err) => {
        console.error(err);
    });
};

/* 새 userstats값 가져왔을때 db 업데이트 */
const updateStats = (userIdApiData: IGetUserId , userStatsApiData: IGetUserStats) => {
    const currentTime = { lastupdate : Date.now()};
    const mergeData = Object.assign(userIdApiData, userStatsApiData, currentTime);
    return fortniteModel.findOneAndUpdate({uid : userIdApiData.uid}, {$set : mergeData});
};

/* 조회하지않은 사용자가 검색했을때 저장 */
const createStats = (userIdApiData: IGetUserId , userStatsApiData: IGetUserStats): Promise<IUserStatsModel> => {
    const mergeData = Object.assign(userIdApiData, userStatsApiData);
    const fortnite = new fortniteModel(mergeData);
    return fortnite.save();
};

/* top10 ranking 구하는 api */
export let getTop10 = (req: Request, res: Response) => {
    const main = async () => {
        /* 시간 체크 */
        const isCheck: IGetTop10 = await top10.findOne({lastupdate : {$lte: (Date.now() - ( 1 * 60 * 1000 ))}}
        , (err, result) => {
            if (err) {
                console.error(err);
                return false;
            }
            if (result) {
                return true;
            } else {
                return false;
            }
        });
        if (isCheck) {
            /* 시간안에 값이 존재할때 */
            return isCheck;
        } else {
            /* 시간안에 값이 존재 하지 않을 때 */
            const data: ITop10 = await callTop10Api();
            const saveData: IGetTop10 = await createTop10(data);
            // console.log(saveData);
            return saveData;
        }
    };

    main().then((result: any) => {
        if (result) {
            res.send({status: true, value: result});
        } else {
            res.send({status: true, msg: 'no ranking data'});
        }
    }).catch((err) => {
        console.error(err);
    });
};

/* top10 api call 요청 */
const callTop10Api = async (): Promise<ITop10> => {
    let result: Promise<ITop10>;
    return await axios.get(
        PfortNiteApi.PGetTop10, {
            params: {
                window: 'top_10_kills',
            },
        },
    ).then((response: AxiosResponse) => {
        if (response.data && response.status >= 200 && response.status < 300) {
            result = response.data.entries;
            if (response.data.error) {
                return null;
            } else {
                return result;
            }
        } else {
            console.log('error');
            return null;
        }
    }).catch((error: AxiosError) => {
        console.error(error);
        return result;
    });
};

/* top10 ranking save */
const createTop10 = async (data: IGetTop10): Promise<ITop10> => {
    const top10Model: ITop10 = new top10({
        entries: data,
        lastupdate: Date.now(),
    });
    return top10Model.save();
};
