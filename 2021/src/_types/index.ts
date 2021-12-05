export interface Resolver {
  (puzzle: string): Promise<string>
}

export interface NumberMap {
  [key: string]: number
}

export interface BingoBoard {
  rows: Array<Array<number>>,
  columns: Array<Array<number>>,
  board: string
}

export interface BingoBoardEnriched {
  rows: Array<Array<number>>,
  columns: Array<Array<number>>,
  board: string,
  iteration: number,
  solved: boolean,
  solution: number
}
