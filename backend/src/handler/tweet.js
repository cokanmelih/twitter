var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as tweet from "../service/v1/tweet.js";
import utils from "../utils/utils.js";
export function Like(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = req.query.session;
        const tweetId = req.query.tweet_id;
        if (utils.isNullOrEmpty(session, tweetId)) {
            res.statusCode = 400;
            res.send(new utils.Response(null, "Necessary parameters not given"));
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
        });
    });
}
export function Retweet(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = req.query.session;
        const tweetId = req.query.tweet_id;
        if (utils.isNullOrEmpty(session, tweetId)) {
            res.statusCode = 400;
            res.send(new utils.Response(null, "Necessary parameters not given"));
            return;
        }
        tweet.Retweet(session, tweetId)
            .then((value) => {
            res.statusCode = 200;
            res.send(new utils.Response(value, "Success"));
        })
            .catch((err) => {
            res.statusCode = 401;
            res.send(new utils.Response(null, err));
        });
    });
}
export function Send(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = req.query.session;
        const content = req.query.content;
        const source = req.query.source; // web, ios, android etc.
        if (utils.isNullOrEmpty(session, content, source)) {
            res.statusCode = 400;
            res.send(new utils.Response(null, "Necessary parameters not given"));
            return;
        }
        tweet.Send(session, {
            "content": content,
            "source": source,
        })
            .then((value) => {
            res.statusCode = 200;
            res.send(new utils.Response(value, "Success"));
        })
            .catch((err) => {
            res.statusCode = 400;
            res.send(new utils.Response(null, err));
        });
    });
}
export function Get(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = req.query.session;
        if (utils.isNullOrEmpty(session)) {
            res.statusCode = 400;
            res.send(new utils.Response(null, "Necessary parameters not given"));
            return;
        }
        tweet.Get(session)
            .then((value) => {
            res.statusCode = 200;
            res.send(new utils.Response(value, "Success"));
        })
            .catch((err) => {
            res.statusCode = 400;
            res.send(new utils.Response(null, err));
        });
    });
}
export function Delete(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
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
            res.send(new utils.Response(value, "Success"));
        })
            .catch((err) => {
            res.statusCode = 400;
            res.send(new utils.Response(null, err));
        });
    });
}
export function UndoRetweet(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = req.query.session;
        const tweetId = req.query.tweet_id;
        const retweetId = req.query.retweet_id;
        if (utils.isNullOrEmpty(session, tweetId, retweetId)) {
            res.statusCode = 400;
            res.send(new utils.Response(null, "Necessary parameters not given"));
        }
        tweet.UndoRetweet(session, tweetId, retweetId)
            .then((value) => {
            res.statusCode = 200;
            res.send(new utils.Response(value, "Success"));
        })
            .catch((err) => {
            res.statusCode = 400;
            res.send(new utils.Response(null, err));
        });
    });
}
