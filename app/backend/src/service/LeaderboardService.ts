import MatchesModel from '../model/MatchesModel';
import { ILeaderboard } from '../Interfaces/Leaderboard/ILeaderboard';
import TeamsModel from '../model/TeamsModel';
import { ServiceResponse } from '../Interfaces/ServiceRespose';
import { IMatches } from '../Interfaces/Matches/IMatches';

class LeaderboardService {
  private matchesModel = new MatchesModel();
  private teamsModel = new TeamsModel();

  private static calculateEfficiency(points: number, games: number): number {
    if (games === 0) return 0;
    return parseFloat(((points / (games * 3)) * 100).toFixed(2));
  }

  private static initializeStats(teamName: string): ILeaderboard {
    return {
      name: teamName,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    };
  }

  private static updateStats(stats: ILeaderboard, match: IMatches): ILeaderboard {
    const updatedStats = { ...stats };
    updatedStats.totalGames += 1;
    updatedStats.goalsFavor += match.homeTeamGoals;
    updatedStats.goalsOwn += match.awayTeamGoals;

    if (match.homeTeamGoals > match.awayTeamGoals) {
      updatedStats.totalPoints += 3;
      updatedStats.totalVictories += 1;
    } else if (match.homeTeamGoals === match.awayTeamGoals) {
      updatedStats.totalPoints += 1;
      updatedStats.totalDraws += 1;
    } else {
      updatedStats.totalLosses += 1;
    }
    return updatedStats;
  }

  private static finalizeStats(stats: ILeaderboard): ILeaderboard {
    const finalizedStats = { ...stats };
    finalizedStats.goalsBalance = finalizedStats.goalsFavor - finalizedStats.goalsOwn;
    finalizedStats.efficiency = LeaderboardService.calculateEfficiency(
      finalizedStats.totalPoints,
      finalizedStats.totalGames,
    );
    return finalizedStats;
  }

  private async getHomeMatches(teamId: number): Promise<IMatches[]> {
    return this.matchesModel.findEndedMatches(teamId);
  }

  private async getTeamName(teamId: number): Promise<string> {
    const team = await this.teamsModel.findById(teamId);
    if (!team) throw new Error('Team not found');
    return team.teamName;
  }

  private async getTeamStats(teamId: number): Promise<ILeaderboard> {
    const teamName = await this.getTeamName(teamId);
    const matches = await this.getHomeMatches(teamId);

    let stats = matches.reduce(
      (acc, match) => LeaderboardService.updateStats(acc, match),
      LeaderboardService.initializeStats(teamName),
    );

    stats = LeaderboardService.finalizeStats(stats);

    return stats;
  }

  async getHomeLeaderboard(): Promise<ServiceResponse<ILeaderboard[]>> {
    const teams = await this.teamsModel.findAll();
    const leaderboard = await Promise.all(
      teams.map((team) => this.getTeamStats(team.id)),
    );

    // Ordenação de acordo com as regras de negócio
    leaderboard.sort((a, b) => {
      // Primeiro critério: Total de pontos (em ordem decrescente)
      if (b.totalPoints !== a.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }

      // Segundo critério: Total de vitórias (em ordem decrescente)
      if (b.totalVictories !== a.totalVictories) {
        return b.totalVictories - a.totalVictories;
      }

      // Terceiro critério: Saldo de gols (em ordem decrescente)
      if (b.goalsBalance !== a.goalsBalance) {
        return b.goalsBalance - a.goalsBalance;
      }

      // Quarto critério: Gols a favor (em ordem decrescente)
      return b.goalsFavor - a.goalsFavor;
    });
    return { status: 'SUCCESSFUL', data: leaderboard };
  }
}

export default LeaderboardService;
