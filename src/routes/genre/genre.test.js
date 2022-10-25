// Require Supertest and Express app..
const request = require('supertest');
const app = require('../../app');

// Require Mongo Services..
const {
    mongoConnect,
    mongoDisconnect,
} = require('../../services/mongo.service');

// Run Tests..
// Read End-Point..
describe('Genres API', () => {
    beforeAll(async () => {
        await mongoConnect();
    });

    afterAll(async () => {
        await mongoDisconnect();
    });

    describe('Get Genres', () => {
        test('It Should Respond With 200 Success', async () => {
            const response = await (request(app).get('/genres')
                .expect('Content-Type', /json/)
                .expect(200)
            );
        });
    });

    // Create End-Point..
    describe('Post Genres', () => {
        const validGenre = {
            name: "Cartoon",
        };

        const invalidGenre = {};

        test('It Should Respond With 201 Created', async () => {
            const response = await (request(app).post('/genres')
                .send(validGenre)
                .expect('Content-Type', /json/)
                .expect(201)
            );

            expect(response.body).toMatchObject(validGenre);
        });

        test('It Should Respond With 400 Bad Request', async () => {
            const response = await (request(app).post('/genres')
                .send(invalidGenre)
                .expect('Content-Type', /json/)
                .expect(400)
            );

            expect(response.body).toStrictEqual({
                error: "Bad Request, Name Not Found!",
            });
        });
    });

});