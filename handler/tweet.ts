import * as tweet from "../db/v1/tweet.js";
import utils from "../utils/utils.js";

export async function Get(req: any, res: any) {
    const session = req.query.session;

    if (utils.isNullOrEmpty(session)) {
        res.statusCode = 400;
        res.send(new utils.Response(null, "Necessary parameters not given"));
        return;
    }

    tweet.Get(session)
        .then((value: any) => {
            res.statusCode = 200;
            res.send(new utils.Response(value, "Success"));
        })
        .catch((err: any) => {
            res.statusCOde = 400;
            res.send(new utils.Response(null, err));
        });
}

export async function Delete(req: any, res: any) {
    const session = req.query.session;
    const tweetId = req.query.tweet_id;

    if (utils.isNullOrEmpty(session, tweetId)) {
        res.statusCode = 400;
        res.send(new utils.Response(null, "Necessary parameters not given"));
        return;
    }

    tweet.Delete(session, tweetId)
        .then((value: any) => {
            res.statusCode = 200;
            res.send(new utils.Response(value,"Success"))
        })
        .catch((err)=>{
            res.statusCode = 400;
            res.send(new utils.Response(null,err))
        })
}