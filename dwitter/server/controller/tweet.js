import * as tweetRepository from '../data/tweet.js';

export async function getAllTweets(req, res) {
    const username = req.query.username;
    const data = await (username ? tweetRepository.getAllTweetsByUsername(username) : tweetRepository.getAllTweets());

    res.status(200).json(data);
};

export async function getTweetById(req, res) {
    const id = req.params.tid;
    const tweet = await tweetRepository.getTweetById(id);

    tweet ? res.status(200).json(tweet) : res.status(404).send(`The tid ${id} was not found.`);
};

export async function createTweet(req, res) {
    const { text } = req.body;
    const tweet = await tweetRepository.createTweet(req.uid, text);

    res.status(201).json(tweet);
}

export async function updateTweet(req, res) {
    const id = req.params.tid;
    const newText = req.body.text;
    const tweet = await tweetRepository.getTweetById(id);

    if (!tweet) {
        return res.sendStatus(404);
    }

    if (tweet.uid.toString() !== req.uid.toString()) {
        return res.status(403).send('It was not your tweet.');
    }

    const updated = await tweetRepository.updateTweet(id, newText);
    res.status(200).json(updated);
}

export async function deleteTweet(req, res) {
    const id = req.params.tid;
    const tweet = await tweetRepository.getTweetById(id);

    if (!tweet) {
        return res.sendStatus(404);
    }

    if (tweet.uid.toString() !== req.uid.toString()) {
        return res.status(403).send('It was not your tweet.');
    }

    await tweetRepository.deleteTweet(id);
    res.sendStatus(204);
}