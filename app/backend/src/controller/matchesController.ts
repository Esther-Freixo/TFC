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
}
