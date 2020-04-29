import express = require('express');
import bodyParser = require('body-parser')
import  {router} from './routes/user'
import authJwt = require('./common/authJwt')
require('dotenv').config()

export let app = express();
// parse application/json
app.use(bodyParser.json());

app.use(async (req, res, next) => {
    try {
        let authHeader = req.header('Authorization');
        let sessionID = authHeader.split(' ')[1];
        if (sessionID) {
            let userData = authJwt.verifyToken(sessionID);
            console.log(userData)
            if (userData) {
                req['session'] = {};
                req['session'].userData = userData;
                req['session'].sessionID = sessionID;
            } else {
                return res.status(401).send({
                    status: false,
                    error: {
                        reason: "Invalid Sessiontoken",
                        code: 401
                    }
                });
            }
        }
        next()
    } catch {
        console.log("No Auth")
        if( authJwt.isAuthRequired(req.method, req.originalUrl) ){
            return res.status(401).send({
                status: false,
                error: {
                    reason: "Invalid Sessiontoken",
                    code: 401
                }
            });
        }
        next()
    }
})

app.get('/',(req,res)=>{
    res.status(200).send({
        status:true,
        response:'Hello World!'
    });
});

app.use('/user',router);

app.use((req, res, next) => {
    if (!res['data']) {
        return res.status(404).send({
            status: false,
            error: {
                reason: "Invalid Endpoint", 
                code: 404
            }
        });
    }

    res.status(res.statusCode || 200).send(res['data'] );
})