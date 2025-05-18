import request from 'supertest';
import app, { server } from '../../src/index.test';

const userData = {
    username: 'User',
    email: 'user@example.com',
    password: 'User@123',
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
    describe('POST /auth-register', () => {
        it.only('should register a new user successfully', async () => {
            const response = await request(app)
                .post('/auth-register')
                .send({
                    username: userData.username,
                    email: userData.email,
                    password: userData.password, // Assuming OTP is sent as a password for this example
                });
        
            // Log the entire response for debugging
            console.log('Registration response:', response.body); // Debug log
            console.log('Response status:', response.status); // Log the response status
        
            // Assertions
            expect(response.status).toBe(200);
            expect(response.body.status).toBe(1);
        });
        
    });
});
