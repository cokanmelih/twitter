import * as tweet from "./handler/tweet.js";
import * as user from "./handler/user.js";
import express from "express";
const app = express();
const port = process.env.PORT || 8888;
app.get('/', (req, res) => {
    res.send("Welcome To Server");
});
// Doesn't require token
app.post('/auth/register', user.Register);
app.post('/auth/login', user.Login);
// Requires token
// app.post('/tweet', tweet.Send);
// app.post('/like', tweet.Like);
// app.post('/retweet', tweet.Retweet);
app.get('/tweet', tweet.Get);
app.delete('/tweet', tweet.Delete);
app.listen(port, () => {
    console.log(`success: Server running on port : ${port}!`);
});
