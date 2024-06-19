import TeamsModel from '../model/TeamsModel';
import { ITeamsModel } from '../Interfaces/Teams/ITeamsModel';

export default class TeamsService {
  constructor(
    private teamsModel: ITeamsModel = new TeamsModel(),
  ) {}

  public async findAll() {
    const allTeams = await this.teamsModel.findAll();
    return { status: 'SUCCESSFULL', data: allTeams };
  }
}
