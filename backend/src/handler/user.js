var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import auth from "../service/v1/auth.js";
import utils from "../utils/utils.js";
export function Login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.query.username;
        const password = req.query.password;
        if (utils.isNullOrEmpty(username, password)) {
            res.statusCode = 400;
            res.send(new utils.Response(null, "Necessary parameters not given"));
            return;
        }
        auth.Login(username, password)
            .then((value) => {
            res.statusCode = 200;
            res.send(value);
        })
            .catch((err) => {
            res.statusCode = 401;
            res.send(err);
        });
    });
}
export function Register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.query.username;
        const mail = req.query.mail;
        const phone = req.query.phone;
        const password = req.query.password;
        if (utils.isNullOrEmpty(username, password)) {
            res.statusCode = 400;
            res.send(new utils.Response(null, "Necessary parameters not given"));
            return;
        }
        auth.Register({
            username: username,
            mail: mail,
            password: password,
            phone: phone,
        }).then((value) => {
            res.statusCode = 200;
            res.send(value);
        }).catch((err) => {
            res.statusCode = 401;
            res.send(err);
        });
    });
}
