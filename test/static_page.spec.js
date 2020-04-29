const app = require("./../app");
const request = require("supertest");

App = app.app

test('get root url', async () => {
    const response = await request(App).get("/");
    expect(response.statusCode).toBe(200);
})

