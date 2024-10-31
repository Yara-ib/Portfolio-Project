import { expect } from 'chai';
import request from 'supertest';
import app from '../../server/app/app.js';

// ::: Routes for testing :::
// POST /api/users/signup
// POST /api/users/signin
// GET /api/users/profile
// PUT /api/users/updateProfile/:id

describe('Users Test Suite', () => {
  describe('Users Authentication Tests', () => {
    const userData = {
      username: 'Denis_Simonis9',
      email: 'Lindsay.Gorczany@yahoo.com',
      password: 'sBlNqZOpLvDmxou',
      shippingAddress: {
        firstName: 'Bridgette',
        lastName: 'Gibson',
        location: '016 Sandrine Alley',
        city: 'Potomac',
        country: 'Cayman Islands',
        telephone: '1-330-842-8440 x7968',
      },
    };
    const userDataSignIn = {
      email: 'Lindsay.Gorczany@yahoo.com',
      password: 'sBlNqZOpLvDmxou',
    };
    const userId = '671eec1d0438a757895e3a84';
    const tokenUser =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MWVlYzFkMDQzOGE3NTc4OTVlM2E4NCIsImlhdCI6MTczMDM0OTIyMiwiZXhwIjoxNzMwOTU0MDIyfQ.7Shm3B8Drg4LipNeZJM5tdA7u3AQxwW-0N9kDbxM5NA';
    const dateToUpdate = {
      shippingAddress: {
        firstName: 'newUser',
        lastName: 'newUser',
        location: 'Egypt',
        city: 'Alexandria',
        country: 'Egypt',
        telephone: '+55555',
      },
    };

    // POST /api/users/signup
    it('signUp User Test', async () => {
      const response = await request(app)
        .post('/api/users/signup/')
        .send(userData);
      expect(response.status).to.equal(201);
      expect(response.body).to.have.property(
        'message',
        "Welcome Bridgette! We're thrilled to have you on board!"
      );
      if (response.body.data.length > 0) {
        expect(response.body.data[0]).to.have.property('username');
        expect(response.body.data[0]).to.have.property('shippingAddress');
        expect(response.body.data[0]).to.have.property('email');
      }
    });

    // POST /api/users/signup
    it('Already Signed up Before Test', async () => {
      const response = await request(app)
        .post('/api/users/signup/')
        .send(userData);
      expect(response.status).to.equal(409);
      expect(response.body).to.have.property(
        'message',
        'Email already exists.'
      );
    });

    // POST /api/users/signin
    it('signIn User Test', async () => {
      const response = await request(app)
        .post('/api/users/signin/')
        .send(userDataSignIn);
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property(
        'message',
        'Welcome back Bridgette'
      );
      if (response.body.emailCheck.length > 0) {
        expect(response.body).to.have.property('token');
        expect(response.body).to.have.property('adminOrNot');
        expect(response.body).to.have.property('createdAt');
        expect(response.body.emailCheck[0]).to.have.property('username');
        expect(response.body.emailCheck[0]).to.have.property('shippingAddress');
      }
    });

    // GET /api/users/profile
    it('User Profile Test', async () => {
      const response = await request(app)
        .get('/api/users/profile/')
        .set('Authorization', `Bearer ${tokenUser}`);
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property(
        'message',
        'Welcome back to your Profile Page'
      );
    });

    // PUT /api/users/updateProfile/:id
    it('User Profile Test', async () => {
      const response = await request(app)
        .put(`/api/users/updateProfile/${userId}`)
        .set('Authorization', `Bearer ${tokenUser}`)
        .send(dateToUpdate);

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property(
        'message',
        'Profile was successfully updated!'
      );
      if (response.body.profileToUpdate.length > 0) {
        expect(response.body).to.have.property('adminOrNot');
        expect(response.body.profileToUpdate[0]).to.have.property('username');
        expect(response.body.profileToUpdate[0]).to.have.property(
          'shippingAddress'
        );
      }
    });
  });
});
