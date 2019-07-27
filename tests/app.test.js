import { expect } from 'chai';
import request from "supertest";
import app from '../src/app';
import dotenv from 'dotenv';

dotenv.config();

describe('Test API', () => {
  it('should simulate failure to GET a non-existing route', (done) => {
    request(app)
      .get('/random')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal("Not Found. Use /api/v1 to access the Api");
        done()
      });
  });
});
