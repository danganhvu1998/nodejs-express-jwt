const app = require("./../app");
const request = require("supertest");
const mysql = require("mysql")

App = app.app
var pool  = mysql.createPool({
    connectionLimit : 10,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

test('get root url', async () => {
    const response = await request(App).get("/");
    expect(response.statusCode).toBe(200);
})

describe("Test /user", () => {

    test('get /user', async () => {
        const response = await request(App).get("/user");
        expect( JSON.parse(response.res.text).response ).toEqual( 
            expect.stringMatching(/^Hello World/)
        )
        expect(response.statusCode).toBe(200);
    })

    test('post /user/register', async (done) => {
        await pool.getConnection(async function(err, connection) {
            if (err) {
                console.log(err)
            }
            let sql = "DELETE FROM users WHERE email=\"testEmail@test.test\"";
            await connection.query(sql, function (err, result) {
                if(err){
                    console.log(err)
                } else {
                    connection.release()
                    console.log("Removed Test Acc")
                }
            });
        })
        console.log(123123)
        let response = await request(App)
            .post('/user/register')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({
                'name': 'testUser',
                'email': 'testEmail@test.test',
                'password': 'lotOfTests'
            })
        expect(response.statusCode).toBe(200)
        done();
        // console.log(223123)
        // expect(response.statusCode).toBe(200);
        // console.log(323123)
        // done()
    })
})