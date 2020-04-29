"use strict";
exports.__esModule = true;
var mysql = require("mysql");
require('dotenv').config();
var pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});
function authenUser(credential) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
                reject(err);
            }
            console.log("Connected to authenticate user!");
            var sql = "SELECT id, name, email FROM users WHERE email=? AND password=? LIMIT 1";
            var values = [credential.email, credential.password];
            connection.query(sql, values, function (err, result) {
                connection.release();
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(result[0]);
            });
        });
    });
}
exports.authenUser = authenUser;
function createUser(credential) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
                reject(err);
            }
            console.log("Connected to create new user!");
            var sql = "INSERT INTO users (email, name, password) VALUES ?";
            var values = [[credential.email, credential.name, credential.password]];
            connection.query(sql, [values], function (err, result) {
                connection.release();
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(result.affectedRows);
            });
        });
    });
}
exports.createUser = createUser;
