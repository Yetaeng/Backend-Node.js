import MongoDb from 'mongodb';
import * as userRepository from './auth.js'
import { getTweets } from '../db/database.js';

export async function getAllTweets() {
    return getTweets()
        .find()
        .sort({ createdAt: -1 })
        .toArray()
        .then(mapTweets);
}

export async function getAllTweetsByUsername(username) {
    return getTweets()
        .find({username})
        .sort({ createdAt: -1 })
        .toArray()
        .then(mapTweets);
}

export async function getTweetById(id) {
    return getTweets()
        .findOne({ _id: new MongoDb.ObjectId(id) })
        .then(mapOptionalTweet);
}

export async function createTweet(uid, text) {
    const { username, name, url } = await userRepository.findUserById(uid);
    const tweet = {
        text,
        createdAt: new Date(),
        uid,
        username,
        name,
        url
    }

    return getTweets()
        .insertOne(tweet) // mongodb에 넣는 트윗에는 tid를 만들어주지 않아도 됨
        .then((data) => mapOptionalTweet({ ...tweet, _id: data.insertedId }))
}

export async function updateTweet(id, text) {
    return getTweets()
        .findOneAndUpdate({ _id: new MongoDb.ObjectId(id) }, {$set: { text }}, { returnDocument: 'after' })
        .then((result) => result.value)
        .then(mapOptionalTweet);
}

export async function deleteTweet(id) {
    return getTweets()
        .deleteOne({ _id: new MongoDb.ObjectId(id) });
}

function mapOptionalTweet(tweet) {
    return tweet ? { ...tweet, tid: tweet._id.toString() } : tweet;
}

function mapTweets(tweets) {
    return tweets.map(mapOptionalTweet);
}