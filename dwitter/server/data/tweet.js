import * as userRepository from './auth.js'

let tweets = [{
        tid: '1',
        uid: '1',
        text: "yetaeng's tweet",
        createdAT: new Date(),
    }
]

export async function getAllTweets() {
    return Promise.all(tweets.map(async (tweet) => {
        const { username, name, url } = await userRepository.findUserById(tweet.uid);
        return {...tweet, username, name, url}
    }))
}

export async function getAllTweetsByUsername(name) {
    return getAllTweets()
    .then((tweets) => tweets.filter(tweet => tweet.name === name));
}

export async function getTweetById(id) {
    const found = tweets.find(tweet => tweet.tid === id);
    if (!found) {
        return null;
    }
    const { username, name, url } = await userRepository.findUserById(found.uid);

    return {...found, username, name, url}
}

export async function createTweet(uid, text) {
    const tweet = {
        tid: tweets.length + 1,
        uid: uid,
        text: text,
        createdAT: new Date(),
    }
    tweets = [tweet, ...tweets];

    return getTweetById(tweet.tid);
}

export async function updateTweet(id, text) {
    const tweet = tweets.find(tweet => tweet.tid === id);

    // tweet이 없을수도 있으니까 처리해줌
    if (tweet) {
        tweet.text = text;
    }
    return getTweetById(tweet.tid);
}

export async function deleteTweet(id) {
    return tweets.filter(tweet => tweet.tid !== id);
}