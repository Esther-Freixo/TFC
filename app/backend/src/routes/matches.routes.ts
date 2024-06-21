import { Request, Response, Router } from 'express';
import MatchesController from '../controller/matchesController';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesController.handleMatches(req, res));

export default router;
