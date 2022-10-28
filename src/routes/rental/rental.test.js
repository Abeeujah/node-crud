// Require SuperTest and Express App..
const request = require('supertest');
const app = require('../../app');
const { getCustomer } = require('../../models/customer/customer.model');
const { getMovie } = require('../../models/movie/movie.model');

// Require Mongo Services..
const {
    mongoConnect,
    mongoDisconnect,
} = require('../../services/mongo.service');

// Run Tests..
describe('Rentals API', () => {
    beforeAll(async () => {
        await mongoConnect();
    });

    afterAll(async () => {
        await mongoDisconnect();
    });

    describe('Get Rentals', () => {
        test('It Should Respond with a 200 Success', async () => {
            const response = await (request(app).get('/rentals')
                .expect('Content-Type', /json/)
                .expect(200)
            );
        });
    });

    describe('Post Movie', () => {
        const validRental = {
            customer: "700-296",
            movie: "Salmon"
        };

        const invalidRental = {
            cologne: 34,
        };

        test('It Should Respond With 201 Created', async () => {
            const response = await (request(app).post('/rentals')
                .send(validRental)
                .expect('Content-Type', /json/)
                .expect(201)
            );
        });

        test('It Should Respond With 400 Bad Request', async () => {
            const response = await (request(app).post('/rentals')
                .send(invalidRental)
                .expect('Content-Type', /json/)
                .expect(400));
            expect(response.body).toStrictEqual({
                error: "Bad Request, Missing Required Data..",
            });
        });
    });
});