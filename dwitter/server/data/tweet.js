import { mongoose } from 'mongoose';
import { useVirtualId } from '../db/database.js';
import * as userRepository from './auth.js'

const tweetSchema = new mongoose.Schema(
    {
        text: { type: String, required: true },
        uid: { type: String, required: true },
        username: { type: String, required: true },
        name: { type: String, required: true },
        url: String,
    },
    { timestamps: true},
);

useVirtualId(tweetSchema, 'tid');
const Tweet = mongoose.model('Tweet', tweetSchema);

export async function getAllTweets() {
    return Tweet.find().sort({ createdAt: -1 });
}

export async function getAllTweetsByUsername(username) {
    return Tweet.find({ username }).sort({ createdAt: -1 });
}

export async function getTweetById(id) {
    return Tweet.findById(id);
}

export async function createTweet(uid, text) {
    return userRepository.findUserById(uid)
        .then((user) => {
            new Tweet({ text, uid, username: user.username, name: user.name }).save()
        });
}

export async function updateTweet(id, text) {
    return Tweet.findByIdAndUpdate(id, { text }, { returnOriginal: false });
}

export async function deleteTweet(id) {
    return Tweet.findByIdAndDelete(id);
}