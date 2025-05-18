import request from 'supertest';
import app, { server } from '../../src/index.test';


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

const testingJwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmY0NWFjNzY3NmU4MmExMzI0OGIyNWMiLCJyb2xlcyI6WyI2NmY0NWExOTZiYzY3MGI4ZmQ0YTgxYmQiXSwiaWF0IjoxNzI5MTg3NDgxLCJleHAiOjE3MzE3Nzk0ODF9.bAoU-qtyYtupo49ohIOGZwr5u2zXTPEl7qRQkBfVZhY";

describe('Notification Flow', () => {
    describe('Get /notification-types', () => {
        it.only('should retrieve notification types successfully', async () => {
            const jwtToken = testingJwt;

            const response = await request(app)
                .get('/notification-types')
                .set('Authorization', `Bearer ${jwtToken}`);

            console.log('Notification types response:', response.body);
            console.log('Response status:', response.status);

            expect(response.status).toBe(200);
            expect(response.body.status).toBe(1);
        });
    });
    describe('Get /create-notification', () => {
        it.only('should retrieve notification types successfully', async () => {
            const jwtToken = testingJwt;

            const response = await request(app)
                .post('/create-notification')
                .set('Authorization', `Bearer ${jwtToken}`).send({
                    notificationType: "Confirmation_notification",
                    message: "This is simple test message",
                    subject: "This is simple test subject",
                    "recipients": {
                        "email": "user@example.com",
                        "phone": "+923954654465"
                    }
                });

            // Assertions
            expect(response.status).toBe(200);
            expect(response.body.status).toBe(1);
        });
    });
});
