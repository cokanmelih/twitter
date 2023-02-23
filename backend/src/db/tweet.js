var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { GetIdFromSession, GetSession } from "../db/user.js";
import * as db from "../db/tweet.js";
import { Connection } from "./db.js";
export function InsertRetweet(tweetId, accountId) {
    return __awaiter(this, void 0, void 0, function* () {
        const retweet = { "tweet_id": tweetId, "account_id": accountId };
        return new Promise((resolve, reject) => {
            Connection().query("INSERT INTO tweet_retweets SET ?", retweet, (err, respo) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve("Success");
            });
        });
    });
}
export function InsertTweet(tweet) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            Connection().query("INSERT INTO tweets SET ?", tweet, (err, respo) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve("Success");
            });
        });
    });
}
export function InsertLike(tweet_id, account_id) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const like = {
                "tweet_id": tweet_id,
                "account_id": account_id,
            };
            Connection().query("INSERT INTO tweet_likes SET ?", like, (err, respo) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve("Success");
            });
        });
    });
}
export function CheckRetweet(accountId, tweetId) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            Connection().query('SELECT * FROM tweet_retweets WHERE account_id = ? AND tweet_id = ?', [accountId, tweetId], (err, retweets) => __awaiter(this, void 0, void 0, function* () {
                Connection().query('SELECT * from tweets where id = ?', [tweetId], (err, tweets) => {
                    console.log(retweets);
                    if (err) {
                        reject(err);
                        return;
                    }
                    if (!tweets.length) {
                        reject("Success");
                        return;
                    }
                    if (tweets.length) {
                        if (!retweets.length) {
                            resolve("success");
                        }
                        else {
                            reject("You have already retweeted that tweet");
                        }
                    }
                });
            }));
        });
    });
}
export function CheckLike(accountId, tweetId) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            Connection().query("SELECT * FROM tweet_likes WHERE tweet_id = ? AND account_id = ?", [tweetId, accountId], (err, likes) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (!likes.length) {
                    resolve("This tweet have not liked");
                    return;
                }
                reject("You already have liked that tweet");
            });
        });
    });
}
export function DeleteTweet(tweetId) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            Connection().query('DELETE FROM `tweets` WHERE id = ?', [tweetId], function (err, result) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        reject(err);
                        return;
                    }
                    if (result.length) {
                        resolve("success");
                        return;
                    }
                    reject("Tweet not found");
                });
            });
        });
    });
}
export function GetTweets(authorId) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            Connection().query('SELECT * FROM tweets where author_id = ?', authorId, function (err, tweets) {
                if (err) {
                    reject(err);
                    return;
                }
                if (!tweets.length) {
                    reject("No tweets have found");
                    return;
                }
                resolve(tweets);
            });
        });
    });
}
export function Like(session, tweetId) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            GetIdFromSession(session)
                .then((accountId) => {
                db.CheckLike(accountId, tweetId)
                    .then((value) => {
                    db.InsertLike(tweetId, accountId)
                        .then((value) => resolve(value))
                        .catch((err) => reject(err));
                })
                    .catch((err) => reject(err));
            }).catch((err) => reject(err));
        });
    });
}
export function Send(session, tweet) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            GetIdFromSession(session)
                .then((value) => {
                tweet.author_id = value;
                db.InsertTweet(tweet)
                    .then((value) => resolve(value))
                    .catch((err) => reject(err));
            })
                .catch((err) => resolve(err));
        });
    });
}
export function Get(session) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            GetIdFromSession(session)
                .then((authorId) => {
                db.GetTweets(authorId)
                    .then((tweets) => resolve(tweets))
                    .catch((err) => reject(err));
            })
                .catch((err) => reject(err));
        });
    });
}
export function Retweet(session, tweetId) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            GetIdFromSession(session)
                .then((accountId) => {
                CheckRetweet(accountId, tweetId)
                    .then((value) => __awaiter(this, void 0, void 0, function* () {
                    db.InsertRetweet(tweetId, accountId)
                        .then((value) => resolve("Success"))
                        .catch((err) => reject(err));
                }))
                    .catch((err) => reject(err));
            })
                .catch((err) => reject(err));
        });
    });
}
export function Delete(session, tweetId) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            GetSession(session)
                .then((value) => {
                db.DeleteTweet(tweetId)
                    .then((value) => resolve(value))
                    .catch((err) => reject(err));
            })
                .catch((err) => reject(err));
        });
    });
}
