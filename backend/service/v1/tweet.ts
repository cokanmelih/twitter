import * as db from "../../db/tweet.js"

export function Send(session: any, tweet: any) {
    return new Promise((resolve, reject) => {
        db.Send(session, tweet)
            .then((resp) => { resolve(resp); })
            .catch((err => { reject(err); }))
    })
}

export function Delete(session: any, tweetId: any) {
    return new Promise((resolve, reject) => {
        db.Delete(session, tweetId)
            .then((resp) => { resolve(resp); })
            .catch((err) => { reject(err); })
    })
}

export function Get(session: any) {
    return new Promise((resolve, reject) => {
        db.Get(session)
            .then((resp: any) => { resolve(resp); })
            .catch((err) => { reject(err); });
    })
}
export function Like(session: any, tweetId: any) {
    return new Promise((resolve, reject) => {
        db.Like(session, tweetId)
            .then((resp) => { resolve(resp); })
            .catch((err) => { reject(err); })
    })
}

export function Retweet(session: any, tweetId: any) {
    return new Promise((resolve, reject) => {
        db.Retweet(session, tweetId)
            .then((resp) => { resolve(resp); })
            .catch(err => { reject(err); })
    })
}