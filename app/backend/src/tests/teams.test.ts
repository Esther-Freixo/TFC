import SequelizeTeams from '../database/models/SequelizeTeams'
import { app } from "../app";
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { AllTeams, teamById } from './mocks/teams.mock';

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

  it('Expect to return a team by id', async function(){
    sinon.stub(SequelizeTeams, 'findByPk').resolves(teamById as any);
    const { status, body } = await chai.request(app).get('/teams/5');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teamById);
  })
  afterEach(sinon.restore);
});
