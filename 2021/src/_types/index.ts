export interface Resolver {
  (puzzle: string): Promise<string>
}

export interface Moves {
  [key: string]: number
}