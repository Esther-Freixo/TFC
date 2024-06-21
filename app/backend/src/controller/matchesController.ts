import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchesService from '../service/MatchesService';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  public async handleMatches(req: Request, res: Response):Promise<void> {
    const { inProgress } = req.query;
    if (inProgress !== undefined) {
      this.getFilteredMatches(req, res);
    } else {
      this.getAllMatches(req, res);
    }
  }

  public async getAllMatches(req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.matchesService.findAll();
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getFilteredMatches(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    const inProgressParam = typeof inProgress === 'string' && inProgress === 'true';
    const serviceResponse = await this.matchesService.findMatchesByStatus(inProgressParam);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async patchMatches(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const serviceResponse = await this.matchesService.patchMatch(Number(id));
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async matchScore(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const matchId = Number(id);
    const homeGoals = Number(homeTeamGoals);
    const awayGoals = Number(awayTeamGoals);
    const serviceResponse = await this.matchesService
      .changeMatchScore({ id: matchId, homeTeamGoals: homeGoals, awayTeamGoals: awayGoals });
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
