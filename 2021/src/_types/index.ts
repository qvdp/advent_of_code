export interface Resolver {
  (puzzle: string): Promise<string>
}

export interface NumberMap {
  [key: string]: number
}
