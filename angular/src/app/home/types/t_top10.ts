export interface IReturnTop10 {
    'status': boolean;
    'value': Array<IGetTop10>;
}

export interface IGetTop10 {
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
