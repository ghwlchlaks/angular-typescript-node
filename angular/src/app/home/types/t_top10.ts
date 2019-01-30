export interface IReturnTop10 {
    'status': boolean;
    'value': IGetTop10;
}
interface IGetTop10 {
    _id: string;
    entries: Array<ITop10>;
    lastupdate: string;
    __v: Number;
}
export interface ITop10 {
    _id: string;
    uid: string;
    username: string;
    kills: string;
    wins: string;
    matches: string;
    minutes: string;
    score: string;
    kd: string;
    platform: string;
    rank: number;
}
