import { Request, Response, Router } from 'express';
import MatchesController from '../controller/matchesController';
import Validation from '../middlewares/validations';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesController.handleMatches(req, res));

router.post(
  '/',
  Validation.validateToken,
  Validation.validateTeams,
  (req: Request, res: Response) =>
    matchesController.createMatch(req, res),
);

router.patch('/:id/finish', Validation.validateToken, (req: Request, res: Response) =>
  matchesController.patchMatches(req, res));

router.patch('/:id', Validation.validateToken, (req: Request, res: Response) =>
  matchesController.matchScore(req, res));

export default router;
