import MatchesModel from '../model/MatchesModel';
import { IMatches } from '../Interfaces/Matches/IMatches';
import { ServiceResponse } from '../Interfaces/ServiceRespose';
import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchesModel = new MatchesModel(),
  ) {}

  public async findAll(): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.matchesModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async findMatchesByStatus(inProgress:boolean): Promise<ServiceResponse<IMatches[]>> {
    const activeMatches = await this.matchesModel.findByStatus(inProgress);
    return { status: 'SUCCESSFUL', data: activeMatches };
  }
}
