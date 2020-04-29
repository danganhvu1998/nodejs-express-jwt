"use strict";
exports.__esModule = true;
var jwt = require("jsonwebtoken");
require('dotenv').config();
var authRoutes = [
    { path: '/user/hello', method: 'GET' },
    { path: '/user/password', method: 'PUT' }
];
var SECRET_KEY = process.env.JWT_SECRET;
function isAuthRequired(httpMethod, url) {
    for (var _i = 0, authRoutes_1 = authRoutes; _i < authRoutes_1.length; _i++) {
        var routeObj = authRoutes_1[_i];
        if (routeObj.method === httpMethod && routeObj.path === url) {
            return true;
        }
    }
    return false;
}
exports.isAuthRequired = isAuthRequired;
function generateJWTToken(userData) {
    return jwt.sign(userData, SECRET_KEY);
}
exports.generateJWTToken = generateJWTToken;
function verifyToken(jwtToken) {
    try {
        return jwt.verify(jwtToken, SECRET_KEY);
    }
    catch (e) {
        console.log('e:', e);
        return null;
    }
}
exports.verifyToken = verifyToken;
