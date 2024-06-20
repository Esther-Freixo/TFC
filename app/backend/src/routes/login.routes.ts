import { Request, Response, Router } from 'express';
import UsersController from '../controller/UsersController';
import Validation from '../middlewares/validations';

const router = Router();

const usersController = new UsersController();

router.post(
  '/',
  Validation.validateLogin,
  (req: Request, res: Response) => usersController.Login(req, res),
);

export default router;
