import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app';
import dotenv from 'dotenv';

dotenv.config();

describe('Contact API test', () => {
  let token;
  it('should simulate POST request to sign user up', (done) => {
    request(app)
      .post('/api/v1/signup')
      .send({
        firstName: "David",
        lastName: "Black",
        phoneNumber: "08080808080",
        password: "Password"
      })
      .end((err, res) => {
        token = res.body.token;
        expect(res.status).to.equal(201);
        expect(res.body.token).to.be.a('string');
        done()
      })
  });

  it('should simulate fail to GET all contacts when no contacts exist', (done) => {
    request(app)
      .get('/api/v1/contacts')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.status).to.equal(204);
        done()
      })
  });

  it('should simulate POST request to add contact', (done) => {
    request(app)
      .post('/api/v1/contacts/add')
      .set('Authorization', token)
      .send({
        firstName: "Dennis",
        lastName: "Law",
        phoneNumber: "080808089455",
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.be.a('string');
        done()
      })
  });

  it('should simulate fail to POST request to add contact when an input is empty', (done) => {
    request(app)
      .post('/api/v1/contacts/add')
      .set('Authorization', token)
      .send({
        firstName: " ",
        lastName: "Law",
        phoneNumber: "08080808988455",
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done()
      })
  });

  it('should simulate fail to POST request to add contact when an input is not a string', (done) => {
    request(app)
      .post('/api/v1/contacts/add')
      .set('Authorization', token)
      .send({
        firstName: 85469,
        lastName: "Law",
        phoneNumber: "08080808988455",
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done()
      })
  });

  it('should simulate fail to POST request to add contact when user already exists', (done) => {
    request(app)
      .post('/api/v1/contacts/add')
      .set('Authorization', token)
      .send({
        firstName: "Dennis",
        lastName: "Law",
        phoneNumber: "080808089455",
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done()
      })
  });

  it('should simulate GET all contacts', (done) => {
    request(app)
      .get('/api/v1/contacts')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.be.a('string');
        done()
      })
  });

  it('should simulate GET single contact', (done) => {
    request(app)
      .get('/api/v1/contacts/1')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done()
      })
  });

  it('should simulate fail to GET contact when contact does not exist', (done) => {
    request(app)
      .get('/api/v1/contacts/64732')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done()
      })
  });

  it('should simulate fail to make a request with an invalid token', (done) => {
    let tokens = "dumbo";
    request(app)
      .get('/api/v1/contacts/64732')
      .set('Authorization', tokens)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done()
      })
  });

  it('should simulate fail to make a request without a token', (done) => {
    request(app)
      .get('/api/v1/contacts/64732')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done()
      })
  });

  it('should simulate POST request to add contact', (done) => {
    request(app)
      .post('/api/v1/contacts/add')
      .set('Authorization', token)
      .send({
        firstName: "Steven",
        lastName: "Storage",
        phoneNumber: "00002",
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.be.a('string');
        done()
      })
  });

  it('should simulate to DELETE contact', (done) => {
    request(app)
      .delete('/api/v1/contacts/2')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done()
      })
  });
});

