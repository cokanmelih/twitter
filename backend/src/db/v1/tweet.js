import * as db from "../db.js";
export function Send(session, tweet) {
    return new Promise((resolve, reject) => {
        db.SendTweet(session, tweet)
            .then((resp) => {
            resolve(resp);
            return;
        })
            .catch((err => {
            reject(err);
            return;
        }));
    });
}
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
export function Like(session, tweetId) {
    return new Promise((resolve, reject) => {
        db.LikeTweet(session, tweetId)
            .then((resp) => {
            resolve(resp);
        })
            .catch((err) => {
            reject(err);
        });
    });
}
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
