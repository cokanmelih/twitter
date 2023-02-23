import utils from "../utils/utils.js";
import { Connection } from "./db.js";

export async function GetAccount(usernameOrMail: any, password: any) {
    return new Promise((resolve, reject) => {
        Connection().query("SELECT * FROM accounts WHERE username = ? or mail = ?", [usernameOrMail, usernameOrMail], async function (err, result) {
            if (err) { reject(err); return; }
            if (result.length > 0) {
                await utils.checkPassword(password, result[0].password)
                    .then((value) => resolve(result[0]))
                    .catch((err) => reject(err));
                reject("User not exist");
            }
        })
    })
}

export async function GetSession(session: any) {
    return new Promise((resolve, reject) => {
        Connection().query('Select * FROM sessions WHERE token = ?', session, (err, session) => {
            if (err) { reject(err); return; }
            if (utils.isNullOrEmpty(session[0])) { reject("Missing or Expired Token"); return; }
            resolve(session[0]);
            return;
        })
    })
}

export async function GetIdFromSession(session: any):Promise<number> {
    return new Promise((resolve, reject) => {
        Connection().query('Select * FROM sessions WHERE token = ?', session, (err, session) => {
            if (err) { reject(err); return; }
            if (utils.isNullOrEmpty(session[0])) { reject("Missing or Expired Token"); return; }
            resolve(session[0].account_id);
            return;
        })
    })
}

export async function GetUserByUsernameAndMail(username: string, phone: string, mail: string,) {
    return new Promise((resolve, reject) => {
        Connection().query("SELECT * FROM accounts WHERE username = ? OR mail = ?", [username, mail], function (err, result) {
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
        Connection().query("INSERT INTO sessions SET ?", session, (err: any, respo: any) => {
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
        Connection().query("INSERT INTO accounts SET ?", account, (err: any, respo: any) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(null);
        });
    })
}