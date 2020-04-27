const express = require('express')
const userServices =  require('./../services/userServices.js')
let router = express.Router();

router.get('/',(req,res)=>{
    res.status(200).send({
        status:true,
        response:'Hello World From User'
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
                status: true,
                error: "ah shit goes wrong"
            }
            next()
        }
    )
})

module.exports = router;