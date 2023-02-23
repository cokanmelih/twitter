import { GetIdFromSession, GetSession } from "../db/user.js";
import * as db from "../db/tweet.js";
import { Connection } from "./db.js";

export async function InsertRetweet(tweetId: any, accountId: any) {
    const retweet = { "tweet_id": tweetId, "account_id": accountId };
    return new Promise((resolve, reject) => {
        Connection().query("INSERT INTO tweet_retweets SET ?", retweet, (err: any, respo: any) => {
            if (err) { reject(err); return; }
            resolve("Success");
        });
    })
}

export async function InsertTweet(tweet: any) {
    return new Promise((resolve, reject) => {
        Connection().query("INSERT INTO tweets SET ?", tweet, (err: any, respo: any) => {
            if (err) { reject(err); return; }
            resolve("Success");
        });
    })
}

export async function InsertLike(tweet_id: any, account_id: any) {
    return new Promise((resolve, reject) => {
        const like = {
            "tweet_id": tweet_id,
            "account_id": account_id,
        }
        Connection().query("INSERT INTO tweet_likes SET ?", like, (err: any, respo: any) => {
            if (err) { reject(err); return; }
            resolve("Success");
        });
    })
}

export async function CheckRetweet(accountId: number, tweetId: number) {
    return new Promise((resolve, reject) => {
        Connection().query('SELECT * FROM tweet_retweets WHERE account_id = ? AND tweet_id = ?', [accountId, tweetId], async (err: any, retweets: any) => {
            Connection().query('SELECT * from tweets where id = ?', [tweetId], (err, tweets) => {
                if (err) { reject(err); return; }
                if (tweets.length) {
                    if (!retweets.length) { resolve("success"); }
                    else { reject("You have already retweeted that tweet"); }
                }
                else { reject("Success"); return; }
            })
        })
    })
}

export async function CheckLike(accountId: any, tweetId: AnalyserNode) {
    return new Promise((resolve, reject) => {
        Connection().query("SELECT * FROM tweet_likes WHERE tweet_id = ? AND account_id = ?", [tweetId, accountId], (err, likes) => {
            if (err) { reject(err); return; }
            if (!likes.length) { resolve("This tweet have not liked"); }
            else { reject("You already have liked that tweet"); }
        })
    })
}

export async function DeleteTweet(tweetId: number) {
    return new Promise((resolve, reject) => {
        Connection().query('DELETE FROM `tweets` WHERE id = ?', [tweetId], async function (err: any, result: any) {
            if (err) { reject(err); return; }
            if (result.length) { resolve("success"); }
            else { reject("Tweet not found"); }
        });
    })
}

export async function GetTweets(authorId: number) {
    return new Promise((resolve, reject) => {
        Connection().query('SELECT * FROM tweets where author_id = ?', authorId, function (err: any, tweets: any) {
            if (err) { reject(err); return; }
            if (!tweets.length) { reject("No tweets have found"); }
            else { resolve(tweets); }
        })
    })
}

export async function Like(session: any, tweetId: any) {
    return new Promise((resolve, reject) => {
        GetIdFromSession(session)
            .then((accountId) => {
                db.CheckLike(accountId, tweetId)
                    .then((value) => {
                        db.InsertLike(tweetId, accountId)
                            .then((value) => resolve(value))
                            .catch((err) => reject(err))
                    })
                    .catch((err) => reject(err))
            }).catch((err) => reject(err))
    })
}

export async function Send(session: any, tweet: any) {
    return new Promise((resolve, reject) => {
        GetIdFromSession(session)
            .then((value) => {
                tweet.author_id = value;
                db.InsertTweet(tweet)
                    .then((value) => resolve(value))
                    .catch((err) => reject(err))
            })
            .catch((err) => resolve(err))
    })
}

export async function Get(session: any) {
    return new Promise((resolve, reject) => {
        GetIdFromSession(session)
            .then((authorId) => {
                db.GetTweets(authorId)
                    .then((tweets) => resolve(tweets))
                    .catch((err) => reject(err))
            })
            .catch((err) => reject(err));
    })
}

export async function Retweet(session: any, tweetId: any) {
    return new Promise((resolve, reject) => {
        GetIdFromSession(session)
            .then((accountId) => {
                CheckRetweet(accountId, tweetId)
                    .then(async (value) => {

                        db.InsertRetweet(tweetId, accountId)
                            .then((value) => resolve("Success"))
                            .catch((err) => reject(err))
                    })
                    .catch((err) => reject(err));
            })
            .catch((err) => reject(err))
    })
}

export async function Delete(session: any, tweetId: any) {
    return new Promise((resolve, reject) => {
        GetSession(session)
            .then((value) => {
                db.DeleteTweet(tweetId)
                    .then((value) => resolve(value))
                    .catch((err) => reject(err))
            })
            .catch((err) => reject(err))
    })
}
