var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import utils from "../utils/utils.js";
import { GetIdFromSession, GetSession } from "../db/user.js";
import { Connection } from "../db/db.js";
import * as tweet from "../db/tweet.js";
export function LikeTweet(session, tweetId) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            GetIdFromSession(session)
                .then((accountId) => {
                IfNotLiked(accountId, tweetId)
                    .then((value) => {
                    const tweet = {
                        tweet_id: tweetId,
                        account_id: accountId
                    };
                    Connection().query("INSERT INTO tweet_likes SET ?", tweet, (err, resp) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve("Successfully Liked");
                    });
                })
                    .catch((err) => {
                    reject(err);
                });
            }).catch((err) => {
                reject(err);
            });
        });
    });
}
export function IfNotLiked(accountId, tweetId) {
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
export function SendTweet(session, tweet) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            GetIdFromSession(session)
                .then((value) => {
                tweet.author_id = value;
                Connection().query('INSERT INTO tweets SET ?', [tweet], (err, result) => {
                    resolve("Success");
                    return;
                });
            }).catch((err) => {
                resolve(err);
            });
        });
    });
}
export function GetTweet(session) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            GetSession(session)
                .then((value) => {
                Connection().query('SELECT * FROM tweets where author_id = ?', session[0].account_id, function (err, tweets) {
                    resolve(tweets);
                    return;
                });
            })
                .catch((err) => {
                reject(err);
                return;
            });
        });
    });
}
export function Retweet(session, tweetId) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            GetIdFromSession(session)
                .then((accountId) => {
                Connection().query('SELECT * FROM tweet_retweets WHERE account_id = ? AND tweet_id = ?', [accountId, tweetId], (err, result) => __awaiter(this, void 0, void 0, function* () {
                    yield DoesTweetExist(tweetId)
                        .then((value) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            reject(err);
                            return;
                        }
                        if (result.length == 0) {
                            yield tweet.InsertRetweet({ "tweet_id": tweetId, "account_id": accountId })
                                .then((value) => { resolve("Success"); return; })
                                .catch((err) => { reject(err); return; });
                        }
                        reject("You have already retweeted that tweet");
                    }))
                        .catch((err) => {
                        reject(err);
                    });
                }));
            })
                .catch((err) => {
                reject(err);
            });
        });
    });
}
export function DoesTweetExist(tweetId) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            Connection().query('SELECT * from tweets where id = ?', [tweetId], (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (!result.length) {
                    console.log("in");
                    reject("This Tweet does not exist");
                    return;
                }
                resolve("Tweet Already exist");
            });
        });
    });
}
export function DeleteTweet(session, tweetId) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            GetSession(session)
                .then((value) => {
                Connection().query('DELETE FROM `tweets` WHERE id = ?', [tweetId], function (err, result) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            reject(err);
                            return;
                        }
                        if (result.affectedRows == 0) {
                            resolve("success");
                            return;
                        }
                        reject("You already retweeted that tweet");
                    });
                });
            })
                .catch((err) => {
                reject(err);
            });
        });
    });
}
export function Login(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            Connection().query("SELECT * FROM accounts WHERE username = ?", username, function (err, result) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        reject(err);
                        return;
                    }
                    if (result.length > 0) {
                        yield utils.checkPassword(password, result[0].password)
                            .then((value) => {
                            resolve(result[0]);
                            return;
                        })
                            .catch((err) => {
                            reject(err);
                            return;
                        });
                    }
                    reject("User not exist");
                });
            });
        });
    });
}
