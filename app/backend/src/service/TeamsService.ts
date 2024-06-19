import TeamsModel from '../model/TeamsModel';
import { ITeamsModel } from '../Interfaces/Teams/ITeamsModel';
import { ServiceResponse } from '../Interfaces/ServiceRespose';
import { ITeamsResponse } from '../Interfaces/Teams/ITeams';

export default class TeamsService {
  constructor(
    private teamsModel: ITeamsModel = new TeamsModel(),
  ) {}

  public async findAll(): Promise<ServiceResponse<ITeamsResponse[]>> {
    const allTeams = await this.teamsModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async findById(id: number): Promise<ServiceResponse<ITeamsResponse>> {
    const team = await this.teamsModel.findById(id);
    if(!team) return { status: 'NOT_FOUND', data: { message: 'team not found'}}
    return { status: 'SUCCESSFUL', data: team }
  }
}
