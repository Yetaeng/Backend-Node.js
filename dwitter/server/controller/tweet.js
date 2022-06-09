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
    const tweet = await tweetRepository.updateTweet(id, newText);

    if (!tweet) return res.status(404).send('The tweet was not found');

    res.status(200).json(tweet);
}

export async function deleteTweet(req, res) {
    const id = req.params.tid;
    const tweet = await tweetRepository.getTweetById(id);
    if (!tweet) return res.status(404).send('The tweet was not found');

    await tweetRepository.deleteTweet(id);
    res.sendStatus(204);
}