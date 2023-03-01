import * as db from "../../db/tweet.js"
import { GetIdFromSession, GetSession } from "../../db/user.js"
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
                db.CheckRetweet(accountId, tweetId)
                    .then((value) => {
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