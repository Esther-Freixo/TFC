import SequelizeMatches from '../database/models/SequelizeMatches'
import { app } from "../app";
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { matches } from './mocks/matches.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches router test', () => {
  let chaiHttpResponse: Response;

  it('Expect all matches', async function() {
    sinon.stub(SequelizeMatches, 'findAll').resolves(matches as any);
    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matches);

  });

  afterEach(sinon.restore);
});
