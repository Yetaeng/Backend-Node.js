import MongoDb from 'mongodb';
import { getUsers } from '../db/database.js';

export async function findUserByUsername(username) {
    return getUsers()
        .findOne({ username })
        .then(MapOptionalUser);
}

export async function findUserById(id) {
    return getUsers()
        .findOne({ _id: new MongoDb.ObjectId(id) })
        .then(MapOptionalUser);
}

export async function createUser(user) {
    return getUsers()
        .insertOne(user)
        .then((data) => data.insertedId.toString());
}

function MapOptionalUser(user) {
    return user ? { ...user, uid: user._id.toString() } : null;
}