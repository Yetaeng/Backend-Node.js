import mongoose from 'mongoose';
import { config } from '../config.js';

export async function connectDB() {
    return mongoose.connect(config.db.uri);
};

export function useVirtualId(schema, id) {
    // id라는 가상환경을 만들어서 사용자한테만 데이터 보이게 해줌.
    schema.virtual(id).get(function() {
        return this._id.toString();
    });
    schema.set('toJSON', {virtuals: true});
    schema.set('toObject', {virtuals: true});
};