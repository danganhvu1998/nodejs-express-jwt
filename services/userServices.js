const mysql =  require('mysql')
require('dotenv').config()

var pool  = mysql.createPool({
    connectionLimit : 10,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

exports.authenUser = function(credential){
    return new Promise ((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                console.log(err)
                reject(err);
            }
            console.log("Connected to authenticate user!");
            let sql = "SELECT id, name, email FROM users WHERE email=? AND password=? LIMIT 1";
            let values = [credential.email, credential.password]
            connection.query(sql, values, function (err, result) {
                connection.release()
                if (err) {
                    console.log(err)
                    reject(err)
                }
                resolve(result[0])
            });
        })
    })
}

exports.createUser = function(credential){
    return new Promise ((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                console.log(err)
                reject(err);
            }
            console.log("Connected to create new user!");
            let sql = "INSERT INTO users (email, name, password) VALUES ?";
            let values = [[credential.email, credential.name, credential.password]]
            connection.query(sql, [values], function (err, result) {
                connection.release()
                if (err) {
                    console.log(err)
                    reject(err)
                }
                resolve(result.affectedRows)
            });
        })
    })
}
