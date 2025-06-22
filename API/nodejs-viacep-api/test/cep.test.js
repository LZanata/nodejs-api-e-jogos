const request = require('supertest');
const express = require('express');
const cepRouter = require('../src/routes/cep');
const cepController = require('../src/controllers/cepController');

// Mock the controller
jest.mock('../src/controllers/cepController', () => ({
    getAddressByCep: jest.fn((req, res) => res.json({ mock: true, cep: req.params.cep })),
}));

describe('CEP Router', () => {
    let app;

    beforeAll(() => {
        app = express();
        app.use(express.json());
        app.use('/cep', cepRouter);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call cepController.getAddressByCep on GET /cep/:cep', async () => {
        const testCep = '01001000';
        const response = await request(app).get(`/cep/${testCep}`);

        expect(cepController.getAddressByCep).toHaveBeenCalledTimes(1);
        expect(cepController.getAddressByCep.mock.calls[0][0].params.cep).toBe(testCep);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ mock: true, cep: testCep });
    });
});