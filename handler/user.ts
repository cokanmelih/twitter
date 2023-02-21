import auth from "../db/v1/auth.js"
import utils from "../utils/utils.js";

export async function Login(req: any, res: any) {
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
}

export async function Register(req: any, res: any) {
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
}