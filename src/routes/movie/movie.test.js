// Require SuperTest and Express App..
const request = require('supertest');
const app = require('../../app');

// Require Mongo Services..
const {
    mongoConnect,
    mongoDisconnect,
} = require('../../services/mongo.service');

// Run Tests..
describe('Customers API', () => {
    beforeAll(async () => {
        await mongoConnect();
    });

    afterAll(async () => {
        await mongoDisconnect();
    });

    describe('Get Movies', () => {
        test('It Should Respond with a 200 Success', async () => {
            const response = await (request(app).get('/movies')
                .expect('Content-Type', /json/)
                .expect(200)
            );
        });
    });

    describe('Post Movie', () => {
        const validMovie = {
            title: "Matrix",
            genre: {
                name: "Action"
            },
            numberInStock: 7,
            dailyRentalRate: 5
        };

        const invalidMovie = {
            title: "Matrix",
            numberInStock: 7,
            dailyRentalRate: 5
        };

        test('It Should Respond With 201 Created', async () => {
            const response = await (request(app).post('/movies')
                .send(validMovie)
                .expect('Content-Type', /json/)
                .expect(201)
            );
            expect(response.body).toMatchObject(validMovie);
        });

        test('It Should Respond With 400 Bad Request', async () => {
            const response = await (request(app).post('/movies')
                .send(invalidMovie)
                .expect('Content-Type', /json/)
                .expect(400));
            expect(response.body).toStrictEqual({
                error: "Bad Request, Missing Required Data",
            });
        });
    });
});