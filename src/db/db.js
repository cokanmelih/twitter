var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mysql from "mysql";
import utils from "../utils/utils.js";
const Connection = mysql.createConnection({
    host: process.env.HOST_NAME || "localhost",
    user: "root",
    password: "",
    database: "twitter",
});
export function GetTweet(session) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            GetSession(session)
                .then((value) => {
                Connection.query('SELECT * FROM tweets where author_id = ?', session[0].account_id, function (err, tweets) {
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
export function DeleteTweet(session, tweetId) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            GetSession(session)
                .then((value) => {
                Connection.query('DELETE FROM `tweets` WHERE id = ?', [tweetId], function (err, result) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            reject(err);
                            return;
                        }
                        if (result.affectedRows == 0) {
                            reject("Tweet couldn't found");
                            return;
                        }
                        resolve("Succesfully deleted");
                        return;
                    });
                });
            })
                .catch((err) => {
                reject(err);
                return;
            });
        });
    });
}
export function GetSession(session) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            Connection.query('Select * FROM sessions WHERE token = ?', session, (err, session) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (utils.isNullOrEmpty(session[0])) {
                    reject("Missing or Expired Token");
                    return;
                }
                resolve(session[0].token);
                return;
            });
        });
    });
}
export function Login(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            Connection.query("SELECT * FROM accounts WHERE username = ?", username, function (err, result) {
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
                    return;
                });
            });
        });
    });
}
export function GetUser(username, phone, mail) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            Connection.query("SELECT * FROM accounts WHERE username = ?", [username], function (err, result) {
                if (err) {
                    reject(err);
                    return;
                }
                if (result.length) {
                    if (result[0].mail == mail) {
                        reject("Mail already exist");
                        return;
                    }
                    if (result[0].phone == phone) {
                        reject("Phone already exist");
                        return;
                    }
                    reject("Username already exist");
                    return;
                }
                resolve(result[0]);
                return;
            });
        });
    });
}
export function InsertSession(session) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            Connection.query("INSERT INTO sessions SET ?", session, (err, respo) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(null);
            });
        });
    });
}
export function InsertAccount(account) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            Connection.query("INSERT INTO accounts SET ?", account, (err, respo) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(null);
            });
        });
    });
}
