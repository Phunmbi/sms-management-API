import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import dotenv from 'dotenv';

dotenv.config();

// console.log(process.env);
chai.use(chaiHttp);

it('should simulate failure to GET a non-existing route', () => {
  chai.request(app)
    .get('/random')
    .end((err, res) => {
      console.log(res);
      expect(err).to.be.null;
      expect(res).to.have.status(404);
    });
});
