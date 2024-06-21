import SequelizeTeams from '../database/models/SequelizeTeams';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { IMatches } from '../Interfaces/Matches/IMatches';
import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';
import { ScoreParams } from '../Interfaces/Matches/scoreParams';

export default class MatchesModel implements IMatchesModel {
  private model = SequelizeMatches;

  async findAll(): Promise<IMatches[]> {
    const dbData = await this.model.findAll({
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return dbData;
  }

  async findByStatus(inProgress:boolean): Promise<IMatches[]> {
    const dbData = await this.model.findAll({
      where: { inProgress },
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return dbData;
  }

  async findMatch(id: number): Promise<IMatches | null> {
    const dbdata = await this.model.findOne({ where: { id } });
    if (dbdata) {
      dbdata.inProgress = false;
      await dbdata.save();
      return dbdata;
    }
    return null;
  }

  async findScores({ id, homeTeamGoals, awayTeamGoals }: ScoreParams): Promise<IMatches | null> {
    const dbData = await this.model.findOne({ where: { id } });
    if (dbData) {
      dbData.homeTeamGoals = homeTeamGoals;
      dbData.awayTeamGoals = awayTeamGoals;
      await dbData.save();
      return dbData;
    }
    return null;
  }
}
