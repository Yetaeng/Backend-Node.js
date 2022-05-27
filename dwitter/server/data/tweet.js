let tweets = [{
        tid: '1',
        uid: 'kim',
        name: 'kim',
        text: "kim's tweet",
        createdAT: new Date(),
    },
    {
        tid: '2',
        uid: 'lee',
        name: 'lee',
        text: "lee's tweet",
        createdAT: new Date(),
    }
]

export async function getAllTweets() {
    return tweets;
}

export async function getAllTweetsByUsername(name) {
    return tweets.filter(tweet => tweet.name === name);
}

export async function getTweetById(id) {
    return tweets.find(tweet => tweet.tid === id);
}

export async function createTweet(uid, name, text) {
    const tweet = {
        tid: tweets.length + 1,
        uid: uid,
        name: name,
        text: text,
        createdAT: new Date(),
    }
    tweets = [tweet, ...tweets];

    return tweet;
}

export async function updateTweet(id, text) {
    const tweet = tweets.find(tweet => tweet.tid === id);

    // tweet이 없을수도 있으니까 처리해줌
    if (tweet) {
        tweet.text = text;
    }
    return tweet;
}

export async function deleteTweet(id) {
    return tweets.filter(tweet => tweet.tid !== id);
}