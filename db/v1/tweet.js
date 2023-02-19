"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var mysql = require("mysql");
var utils_1 = require("../../utils/utils");
var conn = mysql.createConnection({
    host: process.env.HOST_NAME || "localhost",
    user: "root",
    password: "",
    database: "twitter"
});
function Send(req, res) {
    var session = req.query.session;
    var tweetBody = req.query.tweet_body;
    if (tweetBody != null) {
        conn.query('SELECT * FROM sessions WHERE token = ?', [session], function (err, row) {
            if (err)
                console.log(err);
            if (row && row.length) {
                var tweet_1 = {
                    author_id: row[0].account_id,
                    content: tweetBody,
                    source: "web"
                };
                conn.query('INSERT INTO tweets SET ?', tweet_1, function (err, resp) {
                    if (err)
                        console.log(err);
                    if (resp) {
                        res.statusCode = 200;
                        res.send(tweet_1);
                        console.log("success: /tweet/send request received");
                    }
                });
            }
            else {
                res.statusCode = 400;
                res.send("Invalid Session");
                console.log("failed: /tweet/send request received");
            }
        });
    }
    else {
        res.statusCode = 400;
        res.send('Necessary Parameters Not Given');
        console.log("failed: /tweet/send request received");
    }
}
function Delete(req, res) {
    var session = req.query.session;
    var tweetId = req.query.tweet_id;
    var authorId = req.query.author_id;
    if (!utils_1["default"].isNullOrEmpty(session, tweetId)) {
        conn.query('SELECT * FROM sessions WHERE token = ?', [session], function (err, row) {
            if (err)
                console.log(err);
            if (row && row.length) {
                if (row[0].account_id == authorId) {
                    conn.query('DELETE FROM `tweets` WHERE id = ?', [tweetId], function (row1) {
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                console.log(row1);
                                res.statusCode = 200;
                                res.send("Successfully deleted");
                                return [2 /*return*/];
                            });
                        });
                    });
                }
                else {
                    res.statusCode = 401;
                    res.send("User does not have permission to delete this tweet");
                }
            }
            else {
                res.statusCode = 400;
                res.send("Invalid Session");
            }
        });
    }
    else {
        res.statusCode = 400;
        res.send('Necessary Parameters Not Given');
    }
}
function Get(req, res) {
    var session = req.query.session;
    if (!utils_1["default"].isNullOrEmpty(session)) {
        conn.query('SELECT * FROM sessions WHERE token = ?', [session], function (err, row) {
            console.log(row);
            if (err)
                console.log(err);
            if (row && row.length) {
                conn.query('SELECT * FROM tweets ', function (err, row1) {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            res.statusCode = 200;
                            res.send(row1);
                            return [2 /*return*/];
                        });
                    });
                });
            }
            else {
                res.statusCode = 400;
                res.send("Invalid Session");
            }
        });
    }
    else {
        res.statusCode = 400;
        res.send('Necessary Parameters Not Given');
    }
}
function Like(req, res) {
    var success = true;
    var session = req.query.session;
    var tweetId = req.query.tweet_id;
    if (!utils_1["default"].isNullOrEmpty(session, tweetId)) {
        conn.query('SELECT * FROM sessions WHERE token = ?', [session], function (err, row) {
            if (err)
                console.log(err);
            if (row && row.length) {
                var like_1 = {
                    tweet_id: tweetId,
                    account_id: row[0].account_id
                };
                conn.query('SELECT * FROM tweet_likes WHERE tweet_id = ?', [tweetId], function (err, row1) {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, row1.forEach(function (value) {
                                        if (value.account_id == row[0].account_id) {
                                            success = false;
                                        }
                                    })];
                                case 1:
                                    _a.sent();
                                    if (success === true) {
                                        conn.query('INSERT INTO tweet_likes SET ?', like_1, function (err, resp) {
                                            if (err)
                                                console.log(err);
                                            if (resp) {
                                                res.statusCode = 200;
                                                res.send(like_1);
                                                return;
                                            }
                                        });
                                    }
                                    else {
                                        res.statusCode = 400;
                                        res.send("You have already liked that tweet");
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
            }
            else {
                res.statusCode = 400;
                res.send("Invalid Session");
            }
        });
    }
    else {
        res.statusCode = 400;
        res.send('Necessary Parameters Not Given');
    }
}
function Retweet(req, res) {
    var success = true;
    var session = req.query.session;
    var retweet_id = req.query.retweet_id;
    if (!utils_1["default"].isNullOrEmpty(session, retweet_id)) {
        conn.query('SELECT * FROM sessions WHERE token = ?', [session], function (err, row) {
            if (err)
                console.log(err);
            if (row && row.length) {
                var like_2 = {
                    tweet_id: retweet_id,
                    account_id: row[0].account_id
                };
                conn.query('SELECT * FROM tweet_retweets WHERE retweet_id = ?', [retweet_id], function (err, row1) {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, row1.forEach(function (value) {
                                        if (value.account_id == row[0].account_id) {
                                            success = false;
                                        }
                                    })];
                                case 1:
                                    _a.sent();
                                    if (success === true) {
                                        conn.query('INSERT INTO tweet_retweets SET ?', like_2, function (err, resp) {
                                            if (err)
                                                console.log(err);
                                            if (resp) {
                                                res.statusCode = 200;
                                                res.send(like_2);
                                                return;
                                            }
                                        });
                                    }
                                    else {
                                        res.statusCode = 400;
                                        res.send("You have already retweeted that tweet");
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
            }
            else {
                res.statusCode = 400;
                res.send("Invalid Session");
            }
        });
    }
    else {
        res.statusCode = 400;
        res.send('Necessary Parameters Not Given');
    }
}
exports["default"] = { Send: Send, Like: Like, Get: Get, Delete: Delete, Retweet: Retweet };
