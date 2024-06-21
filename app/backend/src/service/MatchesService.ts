import MatchesModel from '../model/MatchesModel';
import { IMatches } from '../Interfaces/Matches/IMatches';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceRespose';
import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';
import { ScoreParams } from '../Interfaces/Matches/scoreParams';

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

  public async patchMatch(id:number): Promise<ServiceResponse<ServiceMessage | null>> {
    await this.matchesModel.findMatch(id);
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async changeMatchScore({ id, homeTeamGoals, awayTeamGoals }: ScoreParams):
  Promise<ServiceResponse<ServiceMessage | null>> {
    await this.matchesModel.findScores({ id, homeTeamGoals, awayTeamGoals });
    return { status: 'SUCCESSFUL', data: { message: 'Score updated' } };
  }
}
