var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
                    if (err) {
                        reject(err);
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
                    else {
                        reject("Tweet does not exist");
                        return;
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
                Connection().query('SELECT * from tweets where id = ?', [tweetId], (err, tweets) => {
                    if (err)
                        reject(err);
                    if (tweets.length) {
                        if (!likes.length)
                            resolve("Success");
                        else
                            reject("You already have liked that tweet");
                    }
                    reject("Tweet does not exist");
                });
            });
        });
    });
}
export function DeleteTweet(tweetId) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            Connection().query('DELETE FROM `tweets` WHERE id = ?', [tweetId], function (err, result) {
                return __awaiter(this, void 0, void 0, function* () {
                    console.log(result);
                    if (err) {
                        reject(err);
                        return;
                    }
                    Connection().query('DELETE FROM `tweet_likes` WHERE tweet_id = ?', tweetId, function (error, fields) {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (err) {
                                reject(err);
                                return;
                            }
                            if (result.affectedRows > 0)
                                resolve("success");
                            else
                                reject("Tweet not found");
                        });
                    });
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
                }
                else {
                    resolve(tweets);
                }
            });
        });
    });
}
