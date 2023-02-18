import tweet from "./db/v1/tweet";
import auth from './db/v1/auth';
const express = require('express');


const app = express();
const port = process.env.PORT || 8888;

app.get('/', (req:any, res:any) => {
    res.send("Welcome To Server")
});

app.post('/auth/register', auth.Register);
app.post('/auth/login', auth.LogIn);
app.post('/tweet', tweet.Send);
app.post('/like', tweet.Like);
app.get('/tweet', tweet.Get);
app.delete('/tweet', tweet.Delete);


app.listen(port, () => {
    console.log(`Server running on port : ${port}!`);
})
