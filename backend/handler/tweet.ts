import * as tweet from "../service/v1/tweet.js";
import utils from "../utils/utils.js";

export async function Like(req: any, res: any) {
    const session = req.query.session;
    const tweetId = req.query.tweet_id;

    if (utils.isNullOrEmpty(session, tweetId)) {
        res.statusCode = 400;
        res.send(new utils.Response(null, "Necessary parameters not given"))
        return;
    }

    tweet.Like(session, tweetId)
        .then((resp) => {
            res.statusCode = 200;
            res.send(new utils.Response(resp, "Successfully Liked"));
        })
        .catch((err) => {
            res.statusCode = 400;
            res.send(new utils.Response(null, err));
        })
}

export async function Retweet(req: any, res: any) {
    const session = req.query.session;
    const tweetId = req.query.tweet_id;

    if (utils.isNullOrEmpty(session, tweetId)) {
        res.statusCode = 400;
        res.send(new utils.Response(null, "Necessary parameters not given"))
        return;
    }

    tweet.Retweet(session, tweetId)
        .then((value) => {
            res.statusCode = 200;
            res.send(new utils.Response(value, "Success"))
        })
        .catch((err) => {
            res.statusCode = 401;
            res.send(new utils.Response(null, err));
        })
}

export async function Send(req: any, res: any) {
    const session = req.query.session;
    const content = req.query.content;
    const source = req.query.source; // web, ios, android etc.

    if (utils.isNullOrEmpty(session, content, source)) {
        res.statusCode = 400;
        res.send(new utils.Response(null, "Necessary parameters not given"))
        return;
    }

    tweet.Send(session, {
        "content": content,
        "source": source,
    })
        .then((value: any) => {
            res.statusCode = 200;
            res.send(new utils.Response(value, "Success"));
        })
        .catch((err) => {
            res.statusCode = 400;
            res.send(new utils.Response(null, err));
        })
}

export async function Get(req: any, res: any) {
    const session = req.query.session;

    if (utils.isNullOrEmpty(session)) {
        res.statusCode = 400;
        res.send(new utils.Response(null, "Necessary parameters not given"));
        return;
    }

    tweet.Get(session)
        .then((value: any) => {
            res.statusCode = 200;
            res.send(new utils.Response(value, "Success"));
        })
        .catch((err: any) => {
            res.statusCode = 400;
            res.send(new utils.Response(null, err));
        });
}

export async function Delete(req: any, res: any) {
    const session = req.query.session;
    const tweetId = req.query.tweet_id;

    if (utils.isNullOrEmpty(session, tweetId)) {
        res.statusCode = 400;
        res.send(new utils.Response(null, "Necessary parameters not given"));
        return;
    }

    tweet.Delete(session, tweetId)
        .then((value) => {
            res.statusCode = 200;
            res.send(new utils.Response(value, "Success"))
        })
        .catch((err) => {
            res.statusCode = 400;
            res.send(new utils.Response(null, err))
        })
}

export async function UndoRetweet(req: any, res: any) {
    const session = req.query.session;
    const tweetId = req.query.tweet_id;
    const retweetId = req.query.retweet_id;

    if (utils.isNullOrEmpty(session, tweetId, retweetId)) {
        res.statusCode = 400;
        res.send(new utils.Response(null, "Necessary parameters not given"))
    }

    tweet.UndoRetweet(session, tweetId, retweetId)
        .then((value) => {
            res.statusCode = 200;
            res.send(new utils.Response(value, "Success"))
        })
        .catch((err) => {
            res.statusCode = 400;
            res.send(new utils.Response(null, err))
        })
}