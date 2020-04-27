const express = require('express')
const userServices =  require('./../services/userServices.js')
const authJwt = require('./../common/authJwt')
let router = express.Router();

router.get('/',(req,res)=>{
    res.status(200).send({
        status:true,
        response:'Hello World From User'
    });
});

router.get('/hello',(req,res)=>{
    res.status(200).send({
        status:true,
        response:"Hello "+ req.session.userData.name
    });
});

router.post('/register', (req, res, next) =>{
    console.log(req.body)
    userServices.createUser(req.body).then(
        result => {
            res.statusCode = 200
            res.data = { status: true }
            next()
        }, error => {
            res.statusCode = 400
            res.data = { 
                status: false,
                error: "ah shit goes wrong"
            }
            next()
        }
    )
})

router.post('/login', (req, res, next) =>{
    console.log(req.body)
    userServices.authenUser(req.body).then(
        result => {
            result = JSON.stringify(result)
            res.statusCode = 200
            res.data = { userInfo: result, sessionID: authJwt.generateJWTToken(result) }
            next()
        }, error => {
            res.statusCode = 400
            res.data = { 
                status: false,
                error: "ah shit goes wrong"
            }
            next()
        }
    )
})

module.exports = router;