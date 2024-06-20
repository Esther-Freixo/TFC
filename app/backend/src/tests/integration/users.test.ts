import SequelizeUsers from '../../database/models/SequelizeUsers'
import { app } from "../../app";
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { token } from '../mocks/users.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login router test', () => {
  let chaiHttpResponse: Response;

  it('Expect login to be successful', async function() {
    sinon.stub(SequelizeUsers, 'findOne').resolves(token as any);
    const { status, body } = await chai.request(app).get('/login');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(token);

  });

//   it('Expect to return a team by id', async function(){
//     sinon.stub(SequelizeUsers, 'findByPk').resolves(userById as any);
//     const { status, body } = await chai.request(app).get('/teams/5');

//     expect(status).to.equal(200);
//     expect(body).to.deep.equal(userById);
//   })
  afterEach(sinon.restore);
});
