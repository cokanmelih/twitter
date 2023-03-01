import { GetIdFromSession, GetSession } from "../db/user.js";
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
                else { reject("Tweet does not exist"); return; }
            })
        })
    })
}

export async function CheckLike(accountId: any, tweetId: AnalyserNode) {
    return new Promise((resolve, reject) => {
        Connection().query("SELECT * FROM tweet_likes WHERE tweet_id = ? AND account_id = ?", [tweetId, accountId], (err, likes) => {
            Connection().query('SELECT * from tweets where id = ?', [tweetId], (err, tweets) => {
                if (err) reject(err)
                if (tweets.length) {
                    if (!likes.length) resolve("Success");
                    else reject("You already have liked that tweet");
                }
                reject("Tweet does not exist");
            })
        })
    })
}

export async function DeleteTweet(tweetId: number) {
    return new Promise((resolve, reject) => {
        Connection().query('DELETE FROM `tweets` WHERE id = ?', [tweetId], async function (err: any, result: any) {
            console.log(result);
            if (err) { reject(err); return; }
            Connection().query('DELETE FROM `tweet_likes` WHERE tweet_id = ?', tweetId, async function (error: any, fields: any) {
                if (err) { reject(err); return; }
                if (result.affectedRows > 0) resolve("success")
                else reject("Tweet not found")
            })
        });
    })
}

export async function DeleteRetweet(tweetId: number) {
    return new Promise((resolve, reject) => {
        Connection().query('DELETE FROM `tweet_retweets` WHERE id = ?', [tweetId], async function (err: any, result: any) {
            console.log(result);
            if (err) { reject(err); return; }
            if (result.affectedRows > 0) resolve("success")
            else reject("Retweet not found")
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
