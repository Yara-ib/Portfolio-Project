import { expect } from 'chai';
import request from 'supertest';
import app from '../../server/app/app.js';

// ::: Routes for testing :::
// Services Providers
// POST /api/services/newProvider
// POST /api/services/logProvider
// GET /api/services/getProvider/:id
// PUT /api/services/profile/update/:id

describe('Service Providers Test Suite', () => {
  describe('Service Providers Authorization Tests', () => {
    const sProviderData = {
      username: 'Maverick63',
      email: 'Nikita_Stamm61@yahoo.com',
      password: 'uhoPKhEhhozkTBd',
      firstName: 'Madisyn',
      lastName: 'Ortiz',
      biography:
        'Similique facilis expedita inventore distinctio voluptate cupiditate. Eum similique aliquid odio consequatur culpa. Quaerat fuga quidem alias ea necessitatibus. Quas iure eius similique.',
    };
    const sProviderDataSignIn = {
      email: 'Nikita_Stamm61@yahoo.com',
      password: 'uhoPKhEhhozkTBd',
    };
    const sProviderId = '6721239066f526be91b472a3';
    const tokensProvider =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjEyMzkwNjZmNTI2YmU5MWI0NzJhMyIsImlhdCI6MTczMDIyNTEyNSwiZXhwIjoxNzMwODI5OTI1fQ.wMhoCPmp_Z2ZjWG1k47IxTIuHWnCY6BswXh6Fw5_dg8';
    const dateToUpdate = {
      firstName: 'Maggi',
    };

    // POST /api/services/newProvider
    it('signUp Service Provider Test', async () => {
      const response = await request(app)
        .post('/api/services/newProvider/')
        .send(sProviderData);
      expect(response.status).to.equal(201);
      expect(response.body).to.have.property(
        'message',
        "Welcome Maverick63! We're thrilled to have you on board!"
      );
      if (response.body.data.length > 0) {
        expect(response.body.data[0]).to.have.property('firstName');
        expect(response.body.data[0]).to.have.property('biography');
        expect(response.body.data[0]).to.have.property('servicesOffered');
      }
    });

    // POST /api/services/newProvider
    it('Already Signed up Before Test', async () => {
      const response = await request(app)
        .post('/api/services/newProvider/')
        .send(sProviderData);
      expect(response.status).to.equal(409);
      expect(response.body).to.have.property(
        'message',
        'Email already exists.'
      );
    });

    // POST /api/services/logProvider
    it('signIn Service Provider Test', async () => {
      const response = await request(app)
        .post('/api/services/logProvider/')
        .send(sProviderDataSignIn);
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property(
        'message',
        'Welcome back Maverick63'
      );
      if (response.body.emailCheck.length > 0) {
        expect(response.body).to.have.property('token');
        expect(response.body).to.have.property('createdAt');
        expect(response.body.emailCheck[0]).to.have.property('biography');
        expect(response.body.emailCheck[0]).to.have.property('servicesOffered');
      }
    });

    // GET /api/services/getProvider/:id
    it('sProvider Profile Test', async () => {
      const response = await request(app)
        .get(`/api/services/getProvider/${sProviderId}`)
        .set('Authorization', `Bearer ${tokensProvider}`);
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property(
        'message',
        'Welcome back to your Profile Page'
      );
    });

    // PUT /api/services/profile/update/:id
    it('Update Profile Test', async () => {
      const response = await request(app)
        .put(`/api/services/profile/update/${sProviderId}`)
        .set('Authorization', `Bearer ${tokensProvider}`)
        .send(dateToUpdate);

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property(
        'message',
        'Profile was successfully updated!'
      );
      if (response.body.profileToUpdate.length > 0) {
        expect(response.body).to.have.property('message');
        expect(response.body.profileToUpdate[0]).to.have.property(
          'bannedOrNot'
        );
        expect(response.body.profileToUpdate[0]).to.have.property('biography');
      }
    });
  });
});
