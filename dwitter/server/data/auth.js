import MongoDb from 'mongodb';
import { getUsers } from '../db/database.js';

export async function findUserByUsername(username) {
    return getUsers()
        .findOne({ username })
        .then((data) => {
            return MapOptionalUser(data);
        });
}

export async function findUserById(id) {
    return getUsers()
        .findOne({ _id: new MongoDb.ObjectId(id) })
        .then((data) => {
            return MapOptionalUser(data);
        });
}

export async function createUser(user) {
    return getUsers()
        .insertOne(user)
        .then((data) => {
            return data.insertedId.toString();
        })
}

function MapOptionalUser(user) {
    return user ? { ...user, uid: user._id } : null;
}