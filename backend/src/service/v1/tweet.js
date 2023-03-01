var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as db from "../../db/tweet.js";
import { GetIdFromSession, GetSession } from "../../db/user.js";
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
                db.CheckRetweet(accountId, tweetId)
                    .then((value) => {
                    db.InsertRetweet(tweetId, accountId)
                        .then((value) => resolve("Success"))
                        .catch((err) => reject(err));
                })
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
