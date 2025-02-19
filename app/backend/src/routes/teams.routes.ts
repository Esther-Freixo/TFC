import { Request, Response, Router } from 'express';
import TeamsController from '../controller/TeamsController';

const teamsController = new TeamsController();

const router = Router();

router.get('/', (req: Request, res: Response) => teamsController.getAllTeams(req, res));
router.get('/:id', (req: Request, res: Response) => teamsController.getTeamById(req, res));

export default router;
