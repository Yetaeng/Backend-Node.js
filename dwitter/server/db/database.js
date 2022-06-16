import { MongoClient } from 'mongodb';
import { config } from '../config.js';

export async function connectDB(name) {
    return MongoClient.connect(config.db.host)
    .then((client) => (client.db(name)));
};

const database = await connectDB("dwitter");

export function getUsers() {
    return database.collection("users");
}

export function getTweets() {
    return database.collection("tweets");
}