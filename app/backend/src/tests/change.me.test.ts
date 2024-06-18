import SequelizeTeams from '../database/models/SequelizeTeams'
import { app } from "../app";
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { AllTeams } from './mocks/teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams router test', () => {
  let chaiHttpResponse: Response;

  it('Expect all teams', async function() {
    sinon.stub(SequelizeTeams, 'findAll').resolves(AllTeams as any);
    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(AllTeams);

  });
  afterEach(sinon.restore);
});
