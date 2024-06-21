export interface ICRUDModelReader<T> {
  findAll(): Promise<T[]>,
  findById(id: number): Promise<T | null>
}

export interface ICRUDModelReaderMatches<T> {
  findAll(): Promise<T[]>,

  findByStatus(inProgress: boolean): Promise<T[]>

  findMatch(id:number): Promise<T | null>,

  findScores(params: { id: number; homeTeamGoals: number; awayTeamGoals: number }):
  Promise<T | null>;

  createMatchDB(params: {
    homeTeamId: number;
    awayTeamId: number;
    homeTeamGoals: number;
    awayTeamGoals: number;
  }): Promise<T>;
}
