import SequelizeUsers from '../database/models/SequelizeUsers';
import { IUserModelEmail } from '../Interfaces/Users/IUserModel';
import { IUser } from '../Interfaces/Users/IUser';

export default class UsersModel implements IUserModelEmail {
  private model = SequelizeUsers;

  async findByEmail(email: IUser['email']): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return null;
    const { username, role, id, password } = user;
    return { username, role, id, password, email };
  }
}
