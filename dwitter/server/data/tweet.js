import MongoDb from 'mongodb';
import * as userRepository from './auth.js'
import { getTweets } from '../db/database.js';

export async function getAllTweets() {
    // FAIL: find()
}

export async function getAllTweetsByUsername(username) {
    // FAIL: find()
}

export async function getTweetById(id) {
    return getTweets()
        .findOne({ _id: new MongoDb.ObjectId(id) })
        .then((data) => {
            return data;
        })
}

export async function createTweet(uid, text) {
    const { username, url } = await userRepository.findUserById(uid);

    return getTweets()
        .insertOne({ text, createdAt: new Date(), uid, username, url  })
        .then((data) => {
            const tweet = {
                tid: data.insertedId.toString(),
                text,
                createdAt: new Date(),
                uid,
                username,
                url,
            }

            return tweet;
        })
}

export async function updateTweet(id, text) {
    return getTweets()
        .updateOne({ _id: new MongoDb.ObjectId(id) }, {$set: { text }}, { upsert: false })
        .then((data) => {
            // 트윗을 리턴
            return data;
        })
}

export async function deleteTweet(id) {
    return getTweets()
        .deleteOne({ _id: new MongoDb.ObjectId(id) })
        .then((data) => {
            return data;
        })
}