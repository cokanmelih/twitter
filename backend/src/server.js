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
app.post('/tweet', tweet.Send);
app.post('/tweet/like', tweet.Like);
app.post('/tweet/retweet', tweet.Retweet);
app.post('/tweet/retweet/undo', tweet.UndoRetweet);
app.get('/tweet', tweet.Get);
app.delete('/tweet', tweet.Delete);
//** TODO  */
// data is null on retweet / success
// undo retweet and like
// create db if not exist
app.listen(port, () => {
    console.log(`success: Server running on port : ${port}!`);
});
