import request from 'supertest';
import { expect } from 'chai';
import app from '../../server'; // Assuming 'server.js' is exporting your Express app

describe('AppController', () => {
  it('GET /status should return the status of Redis and DB', (done) => {
    request(app)
      .get('/status')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property('redis');
        expect(res.body).to.have.property('db');
        done();
      });
  });

  it('GET /stats should return the number of users and files', (done) => {
    request(app)
      .get('/stats')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property('users');
        expect(res.body).to.have.property('files');
        done();
      });
  });
});
