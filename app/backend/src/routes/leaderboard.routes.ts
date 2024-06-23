import { Request, Response, Router } from 'express';
import LeaderboardController from '../controller/LeaderboardController';

const router = Router();

const leaderboardController = new LeaderboardController();

router.get('/home', (req: Request, res: Response) =>
  leaderboardController.getLeaderboard(req, res));

export default router;
