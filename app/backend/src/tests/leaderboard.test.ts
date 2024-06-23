import { app } from "../app";
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { expect } = chai;

describe('GET /leaderboard', () => {
    it('should return the correct leaderboard data for home teams', async () => {
      const res = await chai.request(app).get('/leaderboard/home');
      
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      res.body.forEach((team: any) => {
        expect(team).to.have.property('name');
        expect(team).to.have.property('totalPoints');
        expect(team).to.have.property('totalGames');
        expect(team).to.have.property('totalVictories');
        expect(team).to.have.property('totalDraws');
        expect(team).to.have.property('totalLosses');
        expect(team).to.have.property('goalsFavor');
        expect(team).to.have.property('goalsOwn');
      });
    });

    it('should return the correct leaderboard data for away teams', async () => {
        const res = await chai.request(app).get('/leaderboard/away');
        
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        res.body.forEach((team: any) => {
          expect(team).to.have.property('name');
          expect(team).to.have.property('totalPoints');
          expect(team).to.have.property('totalGames');
          expect(team).to.have.property('totalVictories');
          expect(team).to.have.property('totalDraws');
          expect(team).to.have.property('totalLosses');
          expect(team).to.have.property('goalsFavor');
          expect(team).to.have.property('goalsOwn');
        });
    });
  afterEach(sinon.restore);
});
