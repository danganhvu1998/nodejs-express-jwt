const express = require('express');
const bodyParser = require('body-parser')
const mysql = require('mysql')

let app = express();
// parse application/json
app.use(bodyParser.json());

app.get('/',(req,res,next)=>{
    res.status(200).send({
        status:true,
        response:'Hello World!'
    });
});

app.listen(3030)