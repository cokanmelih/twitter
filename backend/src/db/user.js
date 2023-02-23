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
import { Connection } from "./db.js";
export function GetAccount(usernameOrMail, password) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            Connection().query("SELECT * FROM accounts WHERE username = ? or mail = ?", [usernameOrMail, usernameOrMail], function (err, result) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        reject(err);
                        return;
                    }
                    if (result.length > 0) {
                        yield utils.checkPassword(password, result[0].password)
                            .then((value) => resolve(result[0]))
                            .catch((err) => reject(err));
                        reject("User not exist");
                    }
                });
            });
        });
    });
}
export function GetSession(session) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            Connection().query('Select * FROM sessions WHERE token = ?', session, (err, session) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (utils.isNullOrEmpty(session[0])) {
                    reject("Missing or Expired Token");
                    return;
                }
                resolve(session[0]);
                return;
            });
        });
    });
}
export function GetIdFromSession(session) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            Connection().query('Select * FROM sessions WHERE token = ?', session, (err, session) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (utils.isNullOrEmpty(session[0])) {
                    reject("Missing or Expired Token");
                    return;
                }
                resolve(session[0].account_id);
                return;
            });
        });
    });
}
export function GetUserByUsernameAndMail(username, phone, mail) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            Connection().query("SELECT * FROM accounts WHERE username = ? OR mail = ?", [username, mail], function (err, result) {
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
            Connection().query("INSERT INTO sessions SET ?", session, (err, respo) => {
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
            Connection().query("INSERT INTO accounts SET ?", account, (err, respo) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(null);
            });
        });
    });
}
