import { Resolver, BingoBoard } from '../_types'

const parseBoardRows = (boardStrings: string): Array<Array<number>> => {

  return boardStrings
    .split('\n')
    .map((boardString) => {

      const numbers: Array<number> = []
      let i = 0
      while (boardString[i]) {

        if (boardString[i] !== ' ') {

          numbers.push(parseInt(boardString.slice(i)))
          while (boardString[i] && boardString[i] !== ' ') {

            i++

          }

        } else {

          i++

        }

      }
      return numbers

    })
  
}

const parseBoardColumns = (rows: Array<Array<number>>): Array<Array<number>> => {

  return rows.reduce((acc: Array<Array<number>>, row: Array<number>) => {

    row.forEach((int: number, i: number) => {

      if (!acc[i]) {

        acc.push([int])

      } else {

        acc[i].push(int)

      }

    })
    return acc

  }, [])

}

const parseBoards = (arr: Array<string>): Array<BingoBoard> => {

  // Isolate boards from array
  const boardStrings: Array<string> = []
  let i = 0
  let boardStr = ''
  while (i <= arr.length) {

    if (!arr[i]) {

      if (boardStr) {

        boardStrings.push(boardStr)

      }
      boardStr = ''

    } else {

      boardStr = boardStr ? `${boardStr}\n${arr[i]}` : arr[i]

    }
    i++

  }

  // Build board objects
  const parsedBoards: Array<BingoBoard> = []
  i = 0
  while (boardStrings[i]) {

    const boardString: string = boardStrings[i]
    const rows: Array<Array<number>> = parseBoardRows(boardString)
    const columns: Array<Array<number>> = parseBoardColumns(rows)

    const bingoBoard: BingoBoard = { rows, columns, board: boardString }
    parsedBoards.push(bingoBoard)
    i++

  }
  return parsedBoards

}

const solve = (draw: Array<number>, boards: Array<BingoBoard>): number => {

  let i = 0
  while (boards[i]) {

    const { rows, columns } = boards[i]

    // Check rows & columns
    const solvedRow = rows.find((row) => row.every((int) => draw.includes(int)))
    const solvedColumn = columns.find((col) => col.every((int) => draw.includes(int)))
    if (solvedRow || solvedColumn) {

      return (rows.flat()).reduce(
        (acc: number, cur: number) => draw.includes(cur) ? acc : acc + cur, 0
      )

    }
    i++

  }
  return 0

}

// GOAL: determine the first winning card
const resolver: Resolver = async (puzzle) => new Promise((resolve) => {

  // Build bingo boards
  const [drawString, ...rest]: Array<string> = puzzle.split('\n')
  const draws: Array<number> = drawString.split(',').map(draw => +draw)
  const boards: Array<BingoBoard> = parseBoards(rest)

  // Find the first winning board
  let i = 5
  while (draws[i] >= 0) {

    const solution = solve(draws.slice(0, i), boards)
    if (solution) {

      return resolve(`${solution * draws[i - 1]}`)

    }
    i++

  }
  return resolve('')

})

export default resolver
