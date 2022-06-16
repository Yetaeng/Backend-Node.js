import { connectDB } from '../db/database.js';

const database = await connectDB("dwitter");
const users = database.collection("users");

export async function findUserByUsername(username) {
    const query = { username: username };
    
    return await users.findOne(query);
}

export async function findUserById(id) {
    const query = { uid: id };

    return await users.findOne(query);
}

export async function createUser(user) {
    const newDoc = {
        ...user,
        uid: Date.now().toString(),
    }
    await users.insertOne(newDoc);

    return newDoc.uid;
}