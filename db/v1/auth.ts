import * as mysql from "mysql";
import  utils from "../../utils/utils"
import { v4 as uuidv4 } from 'uuid';

function LogIn(req:any, res:any) {
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
            isValidPassword.then((value:any) => {
                if (value) {
                    const user = row;
                    delete user.password;
                    new Date().toISOString().slice(0, 19).replace('T', ' ');
                    const unixTimeStamp = Date.now();
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
                        console.log("success: /auth/login request received");
                        }
                    })
                } else {
                    res.statusCode = 400;
                    res.send("Invalid username or password");
                    console.log("failed: /auth/login request received");
                }
            })
        })
    } else {
        res.statusCode = 400;
        res.send("Necessary parameters not given");
        console.log("failed: /auth/register request received");
    }
}

async function Register(req:any, res:any) {
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
            (err:any, resp:any) => {
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
                                    console.log("success: /auth/register request received");
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
        console.log("failed: /auth/register request received");
    };
}

export default { LogIn, Register };