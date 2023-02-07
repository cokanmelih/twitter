import mysql from 'mysql';
import utils from '../../utils/utils.js';

const conn = mysql.createConnection({
    host: process.env.HOST_NAME || "localhost",
    user: "root",
    password: "",
    database: "twitter",
});

function Send(req, res) {

    const session = req.query.session;
    const tweetBody = req.query.tweetBody
    if (tweetBody != null) {
        conn.query('SELECT * FROM sessions WHERE token = ?', [session], function (err, row) {
            if (err) console.log(err);
            if (row && row.length) {
                const tweet = {
                    author_id: row[0].account_id,
                    content: tweetBody,
                    source: "web",
                }
                conn.query('INSERT INTO tweets SET ?', tweet, function (err, resp) {
                    if (err) console.log(err);
                    if (resp) {
                        res.statusCode = 200;
                        res.send(tweet);
                    }
                })
            }
            else {
                res.statusCode = 400;
                res.send("Invalid Session");
            }
        });
    }
    else {
        res.statusCode = 400;
        res.send('Necessary Parameters Not Given');
    }
}
function Like(req, res) {
    let success = true;
    const session = req.query.session;
    const tweetId = req.query.tweetId;
    if (!utils.isNullOrEmpty(session, tweetId)) {
        conn.query('SELECT * FROM sessions WHERE token = ?', [session], function (err, row) {
            if (err) console.log(err);
            if (row && row.length) {
                const like = {
                    tweet_id: tweetId,
                    account_id: row[0].account_id,
                }
                conn.query('SELECT * FROM tweet_likes WHERE tweet_id = ?', [tweetId], async function (err, row1) {
                    await row1.forEach(value => {
                        if (value.account_id == row[0].account_id) {
                            success = false;  
                        }
                    });
                    if (success === true) {
                        conn.query('INSERT INTO tweet_likes SET ?', like, function (err, resp) {
                            if (err) console.log(err);
                            if (resp) {
                                res.statusCode = 200;
                                res.send(like);
                                return;
                            }
                        })
                    } else {
                        res.statusCode = 400;
                        res.send("You have already liked that tweet");
                    }
                })

            }
            else {
                res.statusCode = 400;
                res.send("Invalid Session");
            }
        });
    } else {
        res.statusCode = 400;
        res.send('Necessary Parameters Not Given');
    }
}

export default { Send, Like };