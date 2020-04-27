const express = require('express');
const bodyParser = require('body-parser')
const mysql = require('mysql')
const userRoute = require('./routes/user')
require('dotenv').config()

let app = express();
// parse application/json
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.status(200).send({
        status:true,
        response:'Hello World!'
    });
});

app.use('/user',userRoute);

app.use((req, res, next) => {
    if (!res.data) {
        return res.status(404).send({
            status: false,
            error: {
                reason: "Invalid Endpoint", 
                code: 404
            }
        });
    }

    res.status(res.statusCode || 200).send(res.data );
})

app.listen(3030)