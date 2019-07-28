import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app';
import dotenv from 'dotenv';

dotenv.config();

describe('User API test', () => {
  it('should simulate POST request to sign user up', (done) => {
    request(app)
      .post('/api/v1/signup')
      .send({
        firstName: "Dennis",
        lastName: "Law",
        phoneNumber: "080808089455",
        password: "Password"
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.token).to.be.a('string');
        done()
      })
  });

  it('should simulate fail to POST request to sign user up when an input is empty', (done) => {
    request(app)
      .post('/api/v1/signup')
      .send({
        firstName: " ",
        lastName: "Law",
        phoneNumber: "08080808988455",
        password: "Passworded"
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done()
      })
  });

  it('should simulate fail to POST request to sign user up when user already exists', (done) => {
    request(app)
      .post('/api/v1/signup')
      .send({
        firstName: "Dennis",
        lastName: "Law",
        phoneNumber: "080808089455",
        password: "Password"
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done()
      })
  });

  it('should simulate fail to POST request to sign user up when input is not a string', (done) => {
    request(app)
      .post('/api/v1/signup')
      .send({
        firstName: 4378239,
        lastName: "Last",
        phoneNumber: "080808089455",
        password: "Password"
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done()
      })
  });

  it('should simulate POST request to sign user in', (done) => {
    request(app)
      .post('/api/v1/login')
      .send({
        phoneNumber: "080808089455",
        password: "Password"
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.token).to.be.a('string');
        done()
      })
  });

  it('should simulate fail to POST request to sign user in when an input is empty', (done) => {
    request(app)
      .post('/api/v1/login')
      .send({
        phoneNumber: " ",
        password: "Password"
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done()
      })
  });

  it('should simulate fail to POST request to sign user in when user already exists', (done) => {
    request(app)
      .post('/api/v1/login')
      .send({
        phoneNumber: "08080548089455",
        password: "Password"
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done()
      })
  });

  it('should simulate fail to POST request to sign user in when password is wrong', (done) => {
    request(app)
      .post('/api/v1/login')
      .send({
        phoneNumber: "08080548089455",
        password: "Pasdsword"
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done()
      })
  });
});

