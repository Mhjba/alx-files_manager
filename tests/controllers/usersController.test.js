import request from 'supertest';
import { expect } from 'chai';
import app from '../../server';

describe('UsersController', () => {
  it('POST /users should create a new user', (done) => {
    request(app)
      .post('/users')
      .send({ email: 'test@example.com', password: 'password123' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('email');
        done();
      });
  });

  it('POST /users should return an error if email is missing', (done) => {
    request(app)
      .post('/users')
      .send({ password: 'password123' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.have.property('error', 'Missing email');
        done();
      });
  });

  it('POST /users should return an error if password is missing', (done) => {
    request(app)
      .post('/users')
      .send({ email: 'test@example.com' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.have.property('error', 'Missing password');
        done();
      });
  });
});

