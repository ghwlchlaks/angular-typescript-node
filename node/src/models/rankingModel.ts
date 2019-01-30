import * as mongoose from 'mongoose';
import * as fortniteTypes from '../types/fortnite-types';

export const top10Schema = new mongoose.Schema({
    entries: [{
        uid: {type: String},
        username: {type: String},
        kills: {type: String},
        wins: {type: String},
        matches: {type: String},
        minutes: {type: String},
        score: {type: String},
        kd: {type: String},
        platform: {type: String},
        rank: {type: Number},
    }],
    lastupdate: {type: Date, required: true, default: Date.now},
});
export interface ITop10 extends fortniteTypes.IGetTop10, mongoose.Document {
    lastupdate: Date;
}
export const Top10: mongoose.Model<ITop10> = mongoose.model<ITop10>('Top10', top10Schema);
// const Top10 = mongoose.model('Top10', top10Schema);
export default Top10;
