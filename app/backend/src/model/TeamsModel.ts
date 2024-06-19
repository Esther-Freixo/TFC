import SequelizeTeams from '../database/models/SequelizeTeams';
import { ITeams, ITeamsResponse } from '../Interfaces/Teams/ITeams';
import { ITeamsModel } from '../Interfaces/Teams/ITeamsModel';

export default class TeamsModel implements ITeamsModel {
  private model = SequelizeTeams;

  async findAll(): Promise<ITeamsResponse[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, teamName }) => (
      { id, teamName }
    ));
  }

  async findById(id: ITeams['id']): Promise<ITeamsResponse | null>{
    const team = await this.model.findByPk(id);
    if(!team) return null;
    return team
  }
}
