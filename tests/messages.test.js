import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app';
import dotenv from 'dotenv';

dotenv.config();


describe('Message API test', () => {
  let token;
  it('should simulate POST request to sign user up', (done) => {
    request(app)
      .post('/api/v1/signup')
      .send({
        firstName: "Greg",
        lastName: "Storage",
        phoneNumber: "00009",
        password: "Password"
      })
      .end((err, res) => {
        token = res.body.token;
        expect(res.status).to.equal(201);
        expect(res.body.token).to.be.a('string');
        done()
      })
  });

  it('should simulate POST request to add contact', (done) => {
    request(app)
      .post('/api/v1/contacts/add')
      .set('Authorization', token)
      .send({
        firstName: "Greg",
        lastName: "Storage",
        phoneNumber: "00009",
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.be.a('string');
        done()
      })
  });

  it('should simulate POST request to add contact', (done) => {
    request(app)
      .post('/api/v1/contacts/add')
      .set('Authorization', token)
      .send({
        firstName: "Baker",
        lastName: "Standard",
        phoneNumber: "00001",
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.be.a('string');
        done()
      })
  });

  it('should simulate fail to GET all messages when no messages exist', (done) => {
    request(app)
      .get('/api/v1/messages')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.status).to.equal(204);
        done()
      })
  });

  it('should simulate POST request to add message', (done) => {
    request(app)
      .post('/api/v1/messages/create')
      .set('Authorization', token)
      .send({
        senderId: "00009",
        receiverId: "00001",
        message: "New messages cause SMS rule",
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.be.a('string');
        done()
      })
  });

  it('should simulate fail to POST request to add message when an input is empty', (done) => {
    request(app)
      .post('/api/v1/messages/create')
      .set('Authorization', token)
      .send({
        senderId: " ",
        receiverId: "080909090",
        message: "Old message",
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done()
      })
  });

  it('should simulate fail to POST request to add message when a sender does not exist', (done) => {
    request(app)
      .post('/api/v1/messages/create')
      .set('Authorization', token)
      .send({
        senderId: "88",
        receiverId: "080909090",
        message: "Old message",
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done()
      })
  });

  it('should simulate fail to POST request to add message when a receiver does not exist', (done) => {
    request(app)
      .post('/api/v1/messages/create')
      .set('Authorization', token)
      .send({
        senderId: "00009",
        receiverId: "080909090",
        message: "Old message",
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done()
      })
  });

  it('should simulate fail to POST request to add message when an input is not a string', (done) => {
    request(app)
      .post('/api/v1/messages/create')
      .set('Authorization', token)
      .send({
        senderId: 4387,
        receiverId: "080909090",
        message: "Old message",
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done()
      })
  });

  it('should simulate GET all messages', (done) => {
    request(app)
      .get('/api/v1/messages')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.be.a('string');
        done()
      })
  });

  it('should simulate GET single message', (done) => {
    request(app)
      .get('/api/v1/messages/1')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done()
      })
  });

  it('should simulate fail to GET contact when message does not exist', (done) => {
    request(app)
      .get('/api/v1/messages/64732')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done()
      })
  });

  it('should simulate to DELETE message', (done) => {
    request(app)
      .delete('/api/v1/messages/1')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done()
      })
  });

  it('should simulate to fail to DELETE message when message does not exist', (done) => {
    request(app)
      .delete('/api/v1/messages/1')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done()
      })
  });
});

