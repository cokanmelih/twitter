import mysql from 'mysql';
import utils from "../../utils/utils.js"

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
            const isValıdPassword = utils.checkPassword(password, row.password)
            isValıdPassword.then((value) => {
                if (value) {
                    const query = conn.query('SELECT * FROM sessions WHERE account_id = ?', [row.id]);
                    const user = row;
                    delete user.password;
                    query.on('result', function (row) {
                        res.statusCode = 200;
                        res.send({
                            session: row.token,
                            user: user,
                        });
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

export default { LogIn };