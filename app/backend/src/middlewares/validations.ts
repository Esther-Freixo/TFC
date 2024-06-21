import { NextFunction, Request, Response } from 'express';
import JWT from '../utils/JWT';
import SequelizeTeams from '../database/models/SequelizeTeams';

class Validation {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    if (password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }

  static async validateToken(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    const token = req.headers.authorization;
    if (!token || token === '') {
      return res.status(401).json({ message: 'Token not found' });
    }
    const tokenFormated = token.split(' ')[1];
    const validToken = await JWT.verify(tokenFormated);
    if (validToken === 'Token must be a valid token') {
      return res.status(401).json({ message: validToken });
    }
    res.locals.auth = validToken;
    next();
  }

  static async validateTeams(req: Request, res: Response, next:NextFunction):
  Promise<Response | void> {
    const { homeTeamId, awayTeamId } = req.body;
    if (homeTeamId === awayTeamId) {
      return res.status(422).json({ message:
        'It is not possible to create a match with two equal teams' });
    }
    const homeTeam = await SequelizeTeams.findByPk(homeTeamId);
    const awayTeam = await SequelizeTeams.findByPk(awayTeamId);

    if (!homeTeam || !awayTeam) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    next();
  }
}

export default Validation;
