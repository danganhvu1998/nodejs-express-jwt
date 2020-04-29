import userServices =  require('./../services/userServices.js')
import jwt = require('jsonwebtoken')
require('dotenv').config()

const authRoutes = [
    { path: '/user/hello', method: 'GET' },
    { path: '/user/password', method: 'PUT' }
];

const SECRET_KEY = process.env.JWT_SECRET;

export function isAuthRequired(httpMethod, url){
    for (let routeObj of authRoutes) {
        if (routeObj.method === httpMethod && routeObj.path === url) {
            return true;
        }
    }
    return false;
}

export function generateJWTToken(userData){
    return jwt.sign(userData, SECRET_KEY);
}

export function verifyToken (jwtToken){
    try{
        return jwt.verify(jwtToken, SECRET_KEY);
    }catch(e){
        console.log('e:',e);
        return null;
    }
}