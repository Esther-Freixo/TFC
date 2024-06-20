import { Request, Response } from 'express';
import UsersService from '../service/UsersService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UsersController {
  constructor(private usersService = new UsersService()) {}

  async Login(req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.usersService.login(req.body);
    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
