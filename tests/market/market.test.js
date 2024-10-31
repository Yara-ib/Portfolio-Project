import { expect } from 'chai';
import request from 'supertest';
import app from '../../server/app/app.js';

// ::: Routes for testing :::
// Need Admin Authorization
// GET /api/products/
// GET /api/products/:id
// POST /api/products/add
// PUT /api/products/update/:id

describe('Products Test Suite', () => {
  const productId = '671edc3014d75be1a115ed6f';
  const tokenAdmin =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MGRkMTQzMmUwOWI4NzRmZDMxOWY4ZiIsImlhdCI6MTcyOTgxNTk3OCwiZXhwIjoxNzMwNDIwNzc4fQ.2GqjN-VRhpGersXpfnsNRIswMgMmDu5gEP2Xf5wGFmw';

  const productData = {
    productName: 'Ergonomic Metal1 Table',
    mainCategory: 'Metal3',
    subCategory: 'Incredible',
    brand: 'brand 17',
    images: 'https://loremflickr.com/640/480/city',
    color: 'orchid',
    price: '482.00',
    description:
      'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
    countryOfOrigin: 'UK',
    totalStock: 51,
    sold: 30,
  };
  const dateToUpdate = { countryOfProvider: 'USA' };

  // GET /api/products/
  it('Get List of Products Test', async () => {
    const response = await request(app).get('/api/products/');
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property(
      'message',
      "Here's the list of all Products"
    );
    if (response.body.products.length > 0) {
      expect(response.body.products[0]).to.have.property('productName');
      expect(response.body.products[0]).to.have.property('mainCategory');
      expect(response.body.products[0]).to.have.property('brand');
      expect(response.body.products[0]).to.have.property('description');
      expect(response.body.products[0]).to.have.property('countryOfOrigin');
    }
  });

  // GET /api/products/:id
  it('Get Product by Id Test', async () => {
    const response = await request(app).get(`/api/products/${productId}`);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('product');
    expect(response.body.product).to.have.property('productName');
    expect(response.body.product).to.have.property('brand');
    expect(response.body.product).to.have.property('description');
    expect(response.body.product).to.have.property('countryOfOrigin');
  });

  // POST /api/products/add
  it('Add Product Test', async () => {
    const response = await request(app)
      .post('/api/products/add')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(productData);
    expect(response.status).to.equal(201);
    expect(response.body).to.have.property(
      'message',
      'Ergonomic Metal1 Table: Metal3 was added to the database!'
    );
    if (response.body.data.length > 0) {
      expect(response.body.data[0]).to.have.property('productName');
      expect(response.body.data[0]).to.have.property('brand');
      expect(response.body.data[0]).to.have.property('description');
      expect(response.body.data[0]).to.have.property('countryOfOrigin');
    }
  });

  // PUT /api/products/update/:id
  it('Update Service Test', async () => {
    const response = await request(app)
      .put(`/api/products/update/${productId}`)
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(dateToUpdate);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property(
      'message',
      'Product was successfully updated!'
    );
    if (response.body.productToUpdate.length > 0) {
      expect(response.body.productToUpdate[0]).to.have.property('productName');
      expect(response.body.productToUpdate[0]).to.have.property('brand');
      expect(response.body.productToUpdate[0]).to.have.property('description');
      expect(response.body.productToUpdate[0]).to.have.property(
        'countryOfOrigin'
      );
    }
  });
});
