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
})
