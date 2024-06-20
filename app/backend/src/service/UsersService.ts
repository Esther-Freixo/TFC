import * as bcrypt from 'bcryptjs';
import UsersModel from '../model/UsersModel';
import { IUserModelEmail } from '../Interfaces/Users/IUserModel';
import { ILogin, IUser } from '../Interfaces/Users/IUser';
import { ServiceResponse, ServiceMessage } from '../Interfaces/ServiceRespose';
import JWT from '../utils/JWT';
import { IToken } from '../Interfaces/IToken';

export default class UsersService {
  constructor(
    private userModel:IUserModelEmail = new UsersModel(),
    private jwtService = JWT,
  ) {}

  public async login(data: ILogin): Promise<ServiceResponse<ServiceMessage | IToken>> {
    const user = await this.userModel.findByEmail(data.email);
    if (user) {
      if (!bcrypt.compareSync(data.password, user.password)) {
        return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
      }
      const { email } = user as IUser;
      const token = this.jwtService.sign({ email });
      return { status: 'SUCCESSFUL', data: { token } };
    }
    return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
  }

  public async getRole(email: IUser['email']): Promise<ServiceResponse<ServiceMessage | IToken>> {
    const user = await this.userModel.findByEmail(email);
    if (!user) {
      return { status: 'UNAUTHORIZED', data: { message: 'Token must be a valid token' } };
    }
    return { status: 'SUCCESSFUL', data: { role: user.role } };
  }
}
