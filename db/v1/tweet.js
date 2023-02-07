import mysql from 'mysql';

const conn = mysql.createConnection({
    host: process.env.HOST_NAME || "localhost",
    user: "root",
    password: "",
    database: "twitter",
});

function SendTweet(req, res) {
    conn.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });
    conn.query("SELECT * FROM accounts", (err, rows) => {
        if (err) throw err;

        console.log(rows);
    })
    conn.end();
    let session = req.query.session;
    let tweetBody = req.query.tweetBody;
    let author = req.query.author;
    if (author != null || tweetBody != null) {
        res.send(
            {
                "body": tweetBody,
                "author": author,
            }
        );
    }
    else {
        res.statusCode = 400;
        res.send('Necessary Parameters Not Given');
    }
}

export default { SendTweet };