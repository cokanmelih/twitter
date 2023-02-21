import mysql from "mysql";
import utils from "../utils/utils.js";

const Connection = mysql.createConnection({
    host: process.env.HOST_NAME || "localhost",
    user: "root",
    password: "",
    database: "twitter",
});

export async function GetTweet(session: any) {
    return new Promise((resolve, reject) => {
        GetSession(session)
            .then((value) => {
                Connection.query('SELECT * FROM tweets where author_id = ?', session[0].account_id, function (err: any, tweets: any) {
                    resolve(tweets);
                    return;
                })
            })
            .catch((err) => {
                reject(err);
                return;
            });
    })
}

export async function DeleteTweet(session: any, tweetId: any) {
    return new Promise((resolve, reject) => {
        GetSession(session)
            .then((value) => {
                Connection.query('DELETE FROM `tweets` WHERE id = ?', [tweetId], async function (err: any, result: any) {
                    if (err) { reject(err); return; }
                    if (result.affectedRows == 0) { reject("Tweet couldn't found"); return; }
                    resolve("Succesfully deleted");
                    return;
                })
            })
            .catch(
                (err) => {
                    reject(err);
                    return;
                }
            )
    })
}

export async function GetSession(session: any) {
    return new Promise((resolve, reject) => {
        Connection.query('Select * FROM sessions WHERE token = ?', session, (err, session) => {
            if (err) { reject(err); return; }
            if (utils.isNullOrEmpty(session[0])) { reject("Missing or Expired Token"); return; }
            resolve(session[0].token);
            return;
        })
    })
}

export async function Login(username: string, password: string) {
    return new Promise((resolve, reject) => {
        Connection.query("SELECT * FROM accounts WHERE username = ?", username, async function (err, result) {
            if (err) { reject(err); return; }
            if (result.length > 0) {
                await utils.checkPassword(password, result[0].password)
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
        })
    })
}

export async function GetUser(username: string, phone: string, mail?: string,) {
    return new Promise((resolve, reject) => {
        Connection.query("SELECT * FROM accounts WHERE username = ?", [username], function (err, result) {
            if (err) { reject(err); return; }

            if (result.length) {
                if (result[0].mail == mail) {
                    reject("Mail already exist"); return;
                }
                if (result[0].phone == phone) {
                    reject("Phone already exist"); return;
                }
                reject("Username already exist");
                return;
            }
            resolve(result[0]);
            return;
        })
    })
}

export async function InsertSession(session: any) {
    return new Promise((resolve, reject) => {
        Connection.query("INSERT INTO sessions SET ?", session, (err: any, respo: any) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(null);
        });
    })
}

export async function InsertAccount(account: any) {
    return new Promise((resolve, reject) => {
        Connection.query("INSERT INTO accounts SET ?", account, (err: any, respo: any) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(null);
        });
    })
}
