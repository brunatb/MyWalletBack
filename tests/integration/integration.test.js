const supertest = require('supertest');
const connection = require('../../src/database/index');
const app = require('../../src/app');

async function cleanDatabase(){
    await connection.query('DELETE FROM users');
    await connection.query('DELETE FROM sessions');

    await connection.query('DELETE FROM transactions');
}

beforeAll(cleanDatabase);

afterAll(async() => {
    await cleanDatabase();
    connection.end();
});

let userToken;

describe('POST /api/sign-up', () => {
    it('should return 201 on success signup', async() => {
        const body = {
            name: 'Teste',
            email: 'teste@teste.com',
            password: 'teste123',
            confirmPassword: 'teste123'
        }

        const response = await supertest(app).post('/api/sign-up').send(body);
    
        expect(response.status).toBe(201);
    });

    it('should return 422 on failed signup', async() => {
        const body = {
            name: 'Teste',
            email: 'teste@teste.com',
            password: 'teste1234',
            confirmPassword: 'teste123'
        }

        const response = await supertest(app).post('/api/sign-up').send(body);
    
        expect(response.status).toBe(422);
    })
});

describe('POST /api/sign-in', () => {
    it("should return an object containing id, name, amount and token", async() => {
        const body = {
            email: 'teste@teste.com',
            password: 'teste123'
        }


        const response = await supertest(app).post('/api/sign-in').send(body);
        console.log(response.body);
        const token = await connection.query('SELECT * FROM sessions WHERE "userId" = $1', [response.body.id]);

        userToken = token.rows[0].token;
    
        expect(response.body).toMatchObject({
            id: token.rows[0].userId,
            name: 'Teste',
            amount: '$0.00',
            token: userToken
        });
    })

    it('should return 422 on invalid signin', async() => {
        const body = {
            email: 'teste@teste',
            password: 'teste123',
        }

        const response = await supertest(app).post('/api/sign-in').send(body);
    
        expect(response.status).toBe(422);
    })

    it('should return 401 on wrong password/email', async() => {
        const body = {
            email: 'teste@teste.com',
            password: 'teste1234',
        }

        const response = await supertest(app).post('/api/sign-in').send(body);
    
        expect(response.status).toBe(401);
    })
});

describe('POST /api/transactions', () => {
    it('should return status 201 and an object containing id, name, amount and token', async() => {
        const body = {
            value: 12.50,
            description: 'teste teste'
        }

        const response = await supertest(app).post('/api/transactions').send(body).set('Authorization', userToken);

        expect(response.status).toBe(201);

        expect(response.body).toMatchObject({
            id: expect.anything(),
            name: 'Teste',
            amount: '$12.50',
            token: userToken
        });
    });
});

describe('GET /api/transactions', () => {
    it('should return all inserted transactions with correct format', async () => {
        const response = await supertest(app).get('/api/transactions').set('Authorization', userToken);

        expect(response.body.length).toBe(1);
        expect(response.body[0]).toMatchObject({
            date: expect.anything(),
            description: expect.anything(),
            value: expect.anything()
        });
    });
});

describe('POST /api/sign-out', () => {
    it('should return 201 on success signup', async() => {
        const response = await supertest(app).post('/api/sign-out').set('Authorization', userToken);

        expect(response.status).toBe(200);
    })
});