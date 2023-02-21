import * as db from "../db.js";
// const conn = mysql.createConnection({
//     host: process.env.HOST_NAME || "localhost",
//     user: "root",
//     password: "",
//     database: "twitter",
// });
// function Send(req: any, res: any) {
//     const session = req.query.session;
//     const tweetBody = req.query.tweet_body
//     if (tweetBody != null) {
//         conn.query('SELECT * FROM sessions WHERE token = ?', [session], function (err: any, row: any) {
//             if (err) console.log(err);
//             if (row && row.length) {
//                 const tweet = {
//                     author_id: row[0].account_id,
//                     content: tweetBody,
//                     source: "web",
//                 }
//                 conn.query('INSERT INTO tweets SET ?', tweet, function (err: any, resp: any) {
//                     if (err) console.log(err);
//                     if (resp) {
//                         res.statusCode = 200;
//                         res.send(tweet);
//                         console.log("success: /tweet/send request received");
//                     }
//                 })
//             }
//             else {
//                 res.statusCode = 400;
//                 res.send("Invalid Session");
//                 console.log("failed: /tweet/send request received");
//             }
//         });
//     }
//     else {
//         res.statusCode = 400;
//         res.send('Necessary Parameters Not Given');
//         console.log("failed: /tweet/send request received");
//     }
// }
export function Delete(session, tweetId) {
    return new Promise((resolve, reject) => {
        db.DeleteTweet(session, tweetId)
            .then((resp) => {
            resolve(resp);
            return;
        })
            .catch((err) => {
            reject(err);
            return;
        });
    });
}
export function Get(session) {
    return new Promise((resolve, reject) => {
        db.GetTweet(session)
            .then((resp) => {
            resolve(resp);
            return;
        })
            .catch((err) => {
            reject(err);
            return;
        });
    });
}
// function Like(req: any, res: any) {
//     let success = true;
//     const session = req.query.session;
//     const tweetId = req.query.tweet_id;
//     if (!utils.isNullOrEmpty(session, tweetId)) {
//         conn.query('SELECT * FROM sessions WHERE token = ?', [session], function (err: any, row: any) {
//             if (err) console.log(err);
//             if (row && row.length) {
//                 const like = {
//                     tweet_id: tweetId,
//                     account_id: row[0].account_id,
//                 }
//                 conn.query('SELECT * FROM tweet_likes WHERE tweet_id = ?', [tweetId], async function (err: any, row1: any) {
//                     await row1.forEach((value: any) => {
//                         if (value.account_id == row[0].account_id) {
//                             success = false;
//                         }
//                     });
//                     if (success === true) {
//                         conn.query('INSERT INTO tweet_likes SET ?', like, function (err: any, resp: any) {
//                             if (err) console.log(err);
//                             if (resp) {
//                                 res.statusCode = 200;
//                                 res.send(like);
//                                 return;
//                             }
//                         })
//                     } else {
//                         res.statusCode = 400;
//                         res.send("You have already liked that tweet");
//                     }
//                 })
//             }
//             else {
//                 res.statusCode = 400;
//                 res.send("Invalid Session");
//             }
//         });
//     } else {
//         res.statusCode = 400;
//         res.send('Necessary Parameters Not Given');
//     }
// }
// function Retweet(req: any, res: any) {
//     let success = true;
//     const session = req.query.session;
//     const retweet_id = req.query.retweet_id;
//     if (!utils.isNullOrEmpty(session, retweet_id)) {
//         conn.query('SELECT * FROM sessions WHERE token = ?', [session], function (err: any, row: any) {
//             if (err) console.log(err);
//             if (row && row.length) {
//                 const like = {
//                     tweet_id: retweet_id,
//                     account_id: row[0].account_id,
//                 }
//                 conn.query('SELECT * FROM tweet_retweets WHERE retweet_id = ?', [retweet_id], async function (err: any, row1: any) {
//                     await row1.forEach((value: any) => {
//                         if (value.account_id == row[0].account_id) {
//                             success = false;
//                         }
//                     });
//                     if (success === true) {
//                         conn.query('INSERT INTO tweet_retweets SET ?', like, function (err: any, resp: any) {
//                             if (err) console.log(err);
//                             if (resp) {
//                                 res.statusCode = 200;
//                                 res.send(like);
//                                 return;
//                             }
//                         })
//                     } else {
//                         res.statusCode = 400;
//                         res.send("You have already retweeted}} that tweet");
//                     }
//                 })
//             }
//             else {
//                 res.statusCode = 400;
//                 res.send("Invalid Session");
//             }
//         });
//     } else {
//         res.statusCode = 400;
//         res.send('Necessary Parameters Not Given');
//     }
// }
// export default { Send, Like, Get, Delete, Retweet };
