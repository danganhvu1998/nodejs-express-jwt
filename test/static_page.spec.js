const app = require("./../app");
const request = require("supertest");

App = app.app

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

        let response = await request(App)
            .post('/user/register')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({
                'name': 'testUser',
                'email': 'testEmail@test.test',
                'password': 'lotOfTests'
            })
        expect(response.statusCode).toBe(200);
        console.log(response.statusCode)
        done()
    })
})