import Day, { Units } from '../utils/_day-factory.js'

/**
 * Represents two lists of numbers.
 * @typedef {Object} Lists
 * @property {number[]} left - The left list of numbers.
 * @property {number[]} right - The right list of numbers.
 */
type Lists = {
  left: number[],
  right: number[],
}

const AOC_EXAMPLE = `3   4
4   3
2   5
1   3
3   9
3   3`

// Prepare a set of unit tests with their solution on both solvers
const _units: Units[] = [
  {
    input: AOC_EXAMPLE,
    part1: '11',
    part2: '31'
  }
]

/**
 * Parses the input string into a Lists object.
 * @param {string} puzzle - The raw input string containing pairs of numbers.
 * @returns {Lists} The parsed lists of numbers.
 * @private
 */
const _parseInput = (raw: string): Lists => {
  const lists = raw
    .split('\n')
    .reduce(
      (lists, line): Lists => {
        const [first, second] = line.split('   ')
        lists.left.push(+first)
        lists.right.push(+second)
        return lists
      },
      { left: [], right: [] } as Lists
    )
  lists.left.sort()
  lists.right.sort()

  return lists
}

/**
 * Solves part 1 of the puzzle.
 * @param {string} rawInput - The raw input string.
 * @returns {number} The result of part 1 calculation.
 */
const _solverPart1 = (puzzle: Lists) => {
  return puzzle
    .left
    .reduce(
      (sum: number, nbr: number, index: number): number => {
        return sum + Math.abs(nbr - puzzle.right[index])
      },
      0
    )
    .toString()
}

/**
 * Solves part 2 of the puzzle.
 * @param {string} rawInput - The raw input string.
 * @returns {number} The result of part 2 calculation.
 */
const _solverPart2 = (puzzle: Lists) => {
  return puzzle
    .left
    .reduce(
      (sum: number, currentNbr: number): number => {
        return sum + (currentNbr * puzzle.right.filter((value) => value === currentNbr).length)
      },
      0
    )
    .toString()
}

new Day(1, _units, _parseInput, _solverPart1, _solverPart2).runner()
