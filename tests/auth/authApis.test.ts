import request from 'supertest';
import app, { server } from '../../src/index.test';

const userData = {
    username: 'User',
    email: 'user@example.com',
    password: 'User@123',
    otp: '934512',
};

beforeAll(async () => {
    // Any global setup logic if needed
});

afterAll(async () => {
    await new Promise<void>((resolve, reject) => {
        server.close((err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
});

describe('Authentication Flow', () => {
    describe('POST /auth-otp-verification', () => {
        it('should verify the user with correct OTP', async () => {
            const response = await request(app)
                .post('/auth-otp-verification')
                .send({
                    email: userData.email,
                    otp: userData.otp,
                });

            expect(response.status).toBe(200);
            expect(response.body.status).toBe(1); // Ensure to uncomment this line to check the verification status
        });
    });

    describe('POST /auth-login', () => {
        it('should return status: 1 for valid login credentials', async () => {
            const response = await request(app)
                .post('/auth-login')
                .send({
                    email: userData.email,
                    password: userData.password,
                });

            console.log('Response for valid credentials:', response.body);
            expect(response.status).toBe(200);
            expect(response.body.status).toBe(1);
            expect(response.body.data.token).toBeDefined();
            expect(typeof response.body.data.token).toBe('string');
        });

        it('should return status: 0 for invalid login credentials', async () => {
            const response = await request(app)
                .post('/auth-login')
                .send({
                    email: 'wrong@example.com',
                    password: 'wrongpassword',
                });

            expect(response.status).toBe(200);
            expect(response.body.status).toBe(0);
        });
    });
});
