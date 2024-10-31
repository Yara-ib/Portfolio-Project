import { expect } from 'chai';
import request from 'supertest';
import app from '../../server/app/app.js';

// ::: Routes for testing :::
// Services
// GET /api/services/
// GET /api/services/:id
// POST /api/services/add
// PUT /api/services/update/:id

describe('Services Test Suite', () => {
  const serviceId = '67231ff06298f24fc2103b40';
  const tokenSProvider =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjEyMzkwNjZmNTI2YmU5MWI0NzJhMyIsImlhdCI6MTczMDIyNTEyNSwiZXhwIjoxNzMwODI5OTI1fQ.wMhoCPmp_Z2ZjWG1k47IxTIuHWnCY6BswXh6Fw5_dg8';
  const serviceData = {
    serviceName: 'Practical Soft Table',
    images: 'https://loremflickr.com/640/480/business',
    category: 'Health',
    startingPrice: '12.00',
    description:
      'The beautiful range of Apple Natural\u00e9 that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients',
    countryOfProvider: 'Afghanistan',
  };
  const dateToUpdate = { countryOfProvider: 'USA' };

  // GET /api/services/
  it('Get List of Services Test', async () => {
    const response = await request(app).get('/api/services/');
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property(
      'message',
      "Here's the list of all services"
    );
    expect(response.body.services[0]).to.have.property('serviceName');
    expect(response.body.services[0]).to.have.property('category');
    expect(response.body.services[0]).to.have.property('startingPrice');
    expect(response.body.services[0]).to.have.property('description');
    expect(response.body.services[0]).to.have.property('countryOfProvider');
  });

  // GET /api/services/:id
  it('Get Service by Id Test', async () => {
    const response = await request(app).get(`/api/services/${serviceId}`);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('service');
    if (response.body.service.length > 0) {
      expect(response.body).to.have.property('serviceName');
      expect(response.body.service).to.have.property('serviceProvider');
      expect(response.body.service).to.have.property('category');
      expect(response.body.service).to.have.property('description');
      expect(response.body.service).to.have.property('countryOfProvider');
    }
  });

  // POST /api/services/add
  it('Add Service Test', async () => {
    const response = await request(app)
      .post('/api/services/add')
      .send(serviceData)
      .set('Authorization', `Bearer ${tokenSProvider}`);
    expect(response.status).to.equal(201);
    expect(response.body).to.have.property(
      'message',
      'Practical Soft Table: Health was added to the database!'
    );
    if (response.body.data.length > 0) {
      expect(response.body.data[0]).to.have.property('serviceName');
      expect(response.body.data[0]).to.have.property('category');
      expect(response.body.data[0]).to.have.property('startingPrice');
      expect(response.body.data[0]).to.have.property('description');
      expect(response.body.data[0]).to.have.property('countryOfProvider');
    }
  });

  // PUT /api/services/update/:id
  it('Update Service Test', async () => {
    const response = await request(app)
      .put(`/api/services/update/${serviceId}`)
      .set('Authorization', `Bearer ${tokenSProvider}`)
      .send(dateToUpdate);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property(
      'message',
      'Service was successfully updated!'
    );
    if (response.body.serviceToUpdate.length > 0) {
      expect(response.body.serviceToUpdate[0]).to.have.property('serviceName');
      expect(response.body.serviceToUpdate[0]).to.have.property('category');
      expect(response.body.serviceToUpdate[0]).to.have.property(
        'startingPrice'
      );
      expect(response.body.serviceToUpdate[0]).to.have.property('description');
      expect(response.body.serviceToUpdate[0]).to.have.property(
        'countryOfProvider'
      );
    }
  });
});
