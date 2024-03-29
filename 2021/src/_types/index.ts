export interface Resolver {
  (puzzle: string): Promise<string>
}

export interface NumberMap {
  [key: string]: number
}

export interface StringMap {
  [key: string]: string
}

export interface ArrayStringMap {
  [key: string]: Array<string>
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

export interface Line {
  start: Array<number>,
  end: Array<number>,
  originalStr: string
}

export interface Dot {
  i: number,
  j: number
}

export interface FoldOrder {
  direction: string,
  value: number
}
