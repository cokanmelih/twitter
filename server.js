import express from 'express';
import tweet from "./db/v1/tweet.js";
import account from "./db/v1/account.js";
import auth from "./db/v1/auth.js";


const app = express();
const port = process.env.PORT || 8888;

app.get('/', (req, res) => {
    res.send("Welcome To Server")
});

app.post('/tweet/send', tweet.SendTweet);
app.post('/account/new', account.CreateAccount);
app.post('/auth/login', auth.LogIn);
// app.post('/login', (req, res) => {
//     let username = req.body.username;
//     let password = req.body.password;
//     if (username != null & password != null || username != "" & password != "") {
//         if (username === 'admin' && password === 'admin') {
//             res.send('Login successful');
//         }
//         else {
//             res.statusCode = 400;
//             res.send('Login failed');
//         }
//     } else {
//         res.statusCode = 400;
//         res.send('Necessary Parameters Not Given');
//     }
// })
app.listen(port, () => {
    console.log(`Server running on port : ${port}!`);
})
// CREATE DATABASE IF NOT EXISTS `nodelogin` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
// USE `nodelogin`;
// CREATE TABLE IF NOT EXISTS `accounts` (
//     `id` int(11) NOT NULL AUTO_INCREMENT,
//     `username` varchar(50) NOT NULL,
//     `password` varchar(255) NOT NULL,
//     `email` varchar(100) NOT NULL,
//     PRIMARY KEY (`id`)
//   ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;