import mysql from 'mysql';
import utils from "../../utils/utils.js"
import { v4 as uuidv4 } from 'uuid';

function LogIn(req, res) {
    const conn = mysql.createConnection({
        host: process.env.HOST_NAME || "localhost",
        user: "root",
        password: "",
        database: "twitter",
    });
    const username = req.query.username;
    const password = req.query.password
    const query = conn.query('SELECT * FROM accounts WHERE username = ?', [username]);
    if (!utils.isNullOrEmpty(username, password)) {
        query.on('result', function (row) {
            const isValidPassword = utils.checkPassword(password, row.password)
            isValidPassword.then((value) => {
                if (value) {
                    const user = row;
                    delete user.password;
                    new Date().toISOString().slice(0, 19).replace('T', ' ');
                    const unixTimeStamp = new Date();
                    const expireDate = (new Date(unixTimeStamp + 30 * 24 * 60 * 60)).toISOString().slice(0, 19).replace('T', ' ');
                    const session = {
                        account_id: user.id,
                        expires_at: expireDate,
                        token: uuidv4(),
                    };
                    conn.query("INSERT INTO sessions SET ?", session, (err, resp) => {
                        if (err) { res.statusCode = 400; res.send(); console.log(err) }
                        else {
                            res.statusCode = 200;
                        res.send({
                            session: session.token,
                            user: user,
                        });
                        }
                    })
                } else {
                    res.statusCode = 400;
                    res.send("Invalid username or password");
                }
            })
        })
    } else {
        res.statusCode = 400;
        res.send("Necessary parameters not given");
    }
}

async function Register(req, res) {
    const conn = mysql.createConnection({
        host: process.env.HOST_NAME || "localhost",
        user: "root",
        password: "",
        database: "twitter",
    });
    const username = req.query.username;
    const mail = req.query.mail;
    const phone = req.query.phone;
    let password = req.query.password;

    if (!utils.isNullOrEmpty(username, password, mail, phone)) {
        password = await utils.encryptPassword(password);

        const account = {
            "username": username,
            "password": password,
            "mail": mail,
            "phone": phone,
            "mail_approved": 0,
            "phone_approved": 0,
        };
        await conn.query(
            "SELECT * FROM accounts WHERE username = ?",
            username,
            (err, resp) => {
                if (err) res.statusCode = 400; res.send;
                if (resp.length) {
                    res.statusCode = 400;
                    res.send("User already exist");
                } else {
                    conn.query("SELECT * from accounts WHERE mail = ?", mail, (err, resp) => {
                        if (err) res.statusCode = 400; res.send;
                        if (resp.length) {
                            res.statusCode = 400;
                            res.send("Mail already exist");
                        } else {
                            conn.query("INSERT INTO accounts SET ?", account, (err, respo) => {
                                if (err) { res.statusCode = 400; res.send(); }
                                else {
                                    res.statusCode = 200;
                                    res.send("Successfully registered");

                                }
                            });

                        }
                    });
                }
            }
        )
    }
    else {
        res.statusCode = 400;
        res.send('Necessary Parameters Not Given');
    };
}

export default { LogIn, Register };