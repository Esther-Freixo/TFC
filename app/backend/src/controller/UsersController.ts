import { Request, Response } from 'express';
import UsersService from '../service/UsersService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UsersController {
  constructor(private usersService = new UsersService()) {}

  async Login(req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.usersService.login(req.body);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  async getRole(req: Request, res: Response): Promise<Response> {
    const { email } = res.locals.auth;
    const serviceResponse = await this.usersService.getRole(email);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
