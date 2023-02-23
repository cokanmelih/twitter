var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { v4 } from 'uuid';
import utils from "../../utils/utils.js";
import * as user from "../../db/user.js";
function Login(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(function (resolve, reject) {
            user.GetAccount(username, password)
                .then((resp) => {
                const user = resp;
                const session = {
                    account_id: user.id,
                    expires_at: utils.createExpireDate(),
                    token: v4(),
                };
                user.InsertSession(session)
                    .then((resp) => {
                    user.session = session.token;
                    resolve(new utils.Response(user, "Success"));
                    return;
                }).catch((err) => {
                    reject(new utils.Response(err, "Failed"));
                    return;
                });
            })
                .catch((err) => {
                reject(new utils.Response(err, "Failed"));
                return;
            });
        });
    });
}
;
function Register(user) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(function (resolve, reject) {
            return __awaiter(this, void 0, void 0, function* () {
                user.password = yield utils.encryptPassword(user.password);
                const account = {
                    username: user.username,
                    mail: user.mail,
                    password: user.password,
                    phone: user.phone,
                    mail_approved: 0,
                    phone_approved: 0,
                };
                user.GetUserByUsernameAndMail(user.username, user.phone, user.mail)
                    .then((resp) => {
                    user.InsertAccount(account)
                        .then((value) => {
                        const session = {
                            account_id: user.id,
                            expires_at: utils.createExpireDate(),
                            token: v4(),
                        };
                        delete account.password;
                        user.session = session.token;
                        reject(new utils.Response(account, "Succesfully Registered"));
                    })
                        .catch((err) => {
                        reject(new utils.Response(err, "Failed"));
                    });
                })
                    .catch((err) => {
                    reject(new utils.Response(err, "Failed"));
                });
            });
        });
    });
}
export default { Login, Register };
