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

    describe('Get Customers', () => {
        test('It Should Respond with a 200 Success', async () => {
            const response = await (request(app).get('/customers')
                .expect('Content-Type', /json/)
                .expect(200)
            );
        });
    });

    describe('Post Customer', () => {
        const validCustomer = {
            isGold: true,
            name: "John Doe",
            phone: "443-256"
        };

        const invalidCustomer = {
            isGold: true,
        };

        test('It Should Respond With 201 Created', async () => {
            const response = await (request(app).post('/customers')
                .send(validCustomer)
                .expect('Content-Type', /json/)
                .expect(201)
            );
            expect(response.body).toMatchObject(validCustomer);
        });

        test('It Should Respond With 400 Bad Request', async () => {
            const response = await (request(app).post('/customers')
                .send(invalidCustomer)
                .expect('Content-Type', /json/)
                .expect(400));
            expect(response.body).toStrictEqual({
                error: "Bad Request, Missing Required Customer Field",
            });
        });
    });
});