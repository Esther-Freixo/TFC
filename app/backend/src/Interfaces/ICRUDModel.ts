export interface ICRUDModelReader<T> {
  findAll(): Promise<T[]>,
  findById(id: number): Promise<T | null>
}

export interface ICRUDModelReaderMatches<T> {
  findAll(): Promise<T[]>,
  findByStatus(inProgress: boolean): Promise<T[]>
}
