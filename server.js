import express from 'express';
import tweet from "./db/v1/tweet.js";
import auth from "./db/v1/auth.js";


const app = express();
const port = process.env.PORT || 8888;

app.get('/', (req, res) => {
    res.send("Welcome To Server")
});

app.post('/auth/register', auth.Register);
app.post('/auth/login', auth.LogIn);
app.post('/tweet/new', tweet.Send);
app.post('/tweet/like', tweet.Like);


app.listen(port, () => {
    console.log(`Server running on port : ${port}!`);
})
