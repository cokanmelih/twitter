import * as db from "../../db/tweet.js";
export function Send(session, tweet) {
    return new Promise((resolve, reject) => {
        db.Send(session, tweet)
            .then((resp) => { resolve(resp); })
            .catch((err => { reject(err); }));
    });
}
export function Delete(session, tweetId) {
    return new Promise((resolve, reject) => {
        db.Delete(session, tweetId)
            .then((resp) => { resolve(resp); })
            .catch((err) => { reject(err); });
    });
}
export function Get(session) {
    return new Promise((resolve, reject) => {
        db.Get(session)
            .then((resp) => { resolve(resp); })
            .catch((err) => { reject(err); });
    });
}
export function Like(session, tweetId) {
    return new Promise((resolve, reject) => {
        db.Like(session, tweetId)
            .then((resp) => { resolve(resp); })
            .catch((err) => { reject(err); });
    });
}
export function Retweet(session, tweetId) {
    return new Promise((resolve, reject) => {
        db.Retweet(session, tweetId)
            .then((resp) => { resolve(resp); })
            .catch(err => { reject(err); });
    });
}
