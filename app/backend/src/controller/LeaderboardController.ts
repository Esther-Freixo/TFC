import { Request, Response } from 'express';
import LeaderboardService from '../service/LeaderboardService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  async getLeaderboard(req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.leaderboardService.getHomeLeaderboard();
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
