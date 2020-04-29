"use strict";
exports.__esModule = true;
var express = require("express");
var userServices = require("../services/userServices.js");
var authJwt = require("../common/authJwt");
exports.router = express.Router();
exports.router.get('/', function (req, res) {
    res.status(200).send({
        status: true,
        response: 'Hello World From User'
    });
});
exports.router.get('/hello', function (req, res) {
    res.status(200).send({
        status: true,
        response: "Hello " + req['session'].userData.name
    });
});
exports.router.post('/register', function (req, res, next) {
    console.log(req.body);
    userServices.createUser(req.body).then(function (result) {
        res.statusCode = 200;
        res['data'] = { status: true };
        next();
    }, function (error) {
        res.statusCode = 400;
        res['data'] = {
            status: false,
            error: "ah shit goes wrong"
        };
        next();
    });
});
exports.router.post('/login', function (req, res, next) {
    console.log(req.body);
    userServices.authenUser(req.body).then(function (result) {
        result = Object.assign({}, result); // Convert rowDataPacket to plain Obj
        res.statusCode = 200;
        var resData = { userInfo: result, sessionID: authJwt.generateJWTToken(result) };
        console.log(resData, typeof (resData));
        res.json(resData);
        // next()
    }, function (error) {
        res.statusCode = 400;
        res['data'] = {
            status: false,
            error: "ah shit goes wrong"
        };
    });
});
