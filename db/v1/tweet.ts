import * as mysql from 'mysql';
import utils from '../../utils/utils';

const conn = mysql.createConnection({
    host: process.env.HOST_NAME || "localhost",
    user: "root",
    password: "",
    database: "twitter",
});

function Send(req:any, res:any) {
    const session = req.query.session;
    const tweetBody = req.query.tweet_body
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
                        console.log("success: /tweet/send request received");
                    }
                })
            }
            else {
                res.statusCode = 400;
                res.send("Invalid Session");
                console.log("failed: /tweet/send request received");

            }
        });
    }
    else {
        res.statusCode = 400;
        res.send('Necessary Parameters Not Given');
        console.log("failed: /tweet/send request received");
    }
}

function Delete(req:any, res:any) {
    const session = req.query.session;
    const tweetId = req.query.tweet_id;
    const authorId = req.query.author_id;
    if (!utils.isNullOrEmpty(session, tweetId)) {
        conn.query('SELECT * FROM sessions WHERE token = ?', [session], function (err, row) {
            if (err) console.log(err);
            if (row && row.length) {
                if (row[0].account_id == authorId) {
                    conn.query('DELETE FROM `tweets` WHERE id = ?', [tweetId], async function (row1) {
                        console.log(row1);
                            res.statusCode = 200;
                        res.send("Successfully deleted");
                    })
                }
                else {
                    res.statusCode = 401;
                    res.send("User does not have permission to delete this tweet");
                }
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

function Get(req:any, res:any) {
    const session = req.query.session;
    if (!utils.isNullOrEmpty(session)) {
        conn.query('SELECT * FROM sessions WHERE token = ?', [session], function (err, row) {
            console.log(row);
            if (err) console.log(err);
            if (row && row.length) {
                conn.query('SELECT * FROM tweets ', async function (err, row1) {
                    res.statusCode = 200;
                    res.send(row1);
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
function Like(req:any, res:any) {
    let success = true;
    const session = req.query.session;
    const tweetId = req.query.tweet_id;
    if (!utils.isNullOrEmpty(session, tweetId)) {
        conn.query('SELECT * FROM sessions WHERE token = ?', [session], function (err, row) {
            if (err) console.log(err);
            if (row && row.length) {
                const like = {
                    tweet_id: tweetId,
                    account_id: row[0].account_id,
                }
                conn.query('SELECT * FROM tweet_likes WHERE tweet_id = ?', [tweetId], async function (err, row1) {
                    await row1.forEach((value:any) => {
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

function Retweet(req:any,res:any){
    let success = true;
    const session = req.query.session;
    const retweet_id = req.query.retweet_id;
    if (!utils.isNullOrEmpty(session, retweet_id)) {
        conn.query('SELECT * FROM sessions WHERE token = ?', [session], function (err, row) {
            if (err) console.log(err);
            if (row && row.length) {
                const like = {
                    tweet_id: retweet_id,
                    account_id: row[0].account_id,
                }
                conn.query('SELECT * FROM tweet_retweets WHERE retweet_id = ?', [retweet_id], async function (err, row1) {
                    await row1.forEach((value:any) => {
                        if (value.account_id == row[0].account_id) {
                            success = false;
                        }
                    });
                    if (success === true) {
                        conn.query('INSERT INTO tweet_retweets SET ?', like, function (err, resp) {
                            if (err) console.log(err);
                            if (resp) {
                                res.statusCode = 200;
                                res.send(like);
                                return;
                            }
                        })
                    } else {
                        res.statusCode = 400;
                        res.send("You have already retweeted that tweet");
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

export default { Send, Like, Get, Delete, Retweet };