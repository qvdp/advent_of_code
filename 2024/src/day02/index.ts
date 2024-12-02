import Day, { Units } from '../utils/_day-factory.js'

const AOC_EXAMPLE = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`

// Prepare a set of unit tests with their solution on both solvers
const _units: Units[] = [
  {
    input: AOC_EXAMPLE,
    part1: '2',
    part2: '4'
  }
]

/**
 * Parses the input string into a Lists object.
 * @param {string} puzzle - The raw input string containing pairs of numbers.
 * @returns {Lists} The parsed lists of numbers.
 * @private
 */
const _parseInput = (raw: string): number[][] => {
  const lists = raw
    .split('\n')
    .map((line) => line.split(' ').map(Number))

  return lists
}

const _validateSequence = (sequence: number[]) => {
  // Check if the sequence is strictly increasing or decreasing
  const increasing = sequence.every((val, i) => i === 0 || sequence[i - 1] < val)
  const decreasing = sequence.every((val, i) => i === 0 || sequence[i - 1] > val)

  // Check if all adjacent differences are between 1 and 3
  const validGap = sequence.every(
    (val, i) => i === 0 || (Math.abs(sequence[i] - sequence[i - 1]) >= 1 && Math.abs(sequence[i] - sequence[i - 1]) <= 3)
  )

  return (increasing || decreasing) && validGap
}

/**
 * Solves part 1 of the puzzle.
 * @param {string} rawInput - The raw input string.
 * @returns {number} The result of part 1 calculation.
 */
const _solverPart1 = (puzzle: number[][]) => {
  return puzzle.reduce(
    (sum, report) => sum += _validateSequence(report) ? 1 : 0,
    0
  ).toString()
}

/**
 * Solves part 2 of the puzzle.
 * @param {string} rawInput - The raw input string.
 * @returns {number} The result of part 2 calculation.
 */
const _solverPart2 = (puzzle: number[][]) => {
  return puzzle.reduce(
    (sum, report) => {
      // We build list of sequences to be tested
      const sequences = [
        report,
        ...report.map((el, i) => {
          const copy = [...report]
          copy.splice(i, 1)
          return copy
        })
      ]
      return sum += sequences.some((sequence) => _validateSequence(sequence)) ? 1 : 0
    },
    0
  ).toString()
}

new Day(2, _units, _parseInput, _solverPart1, _solverPart2).runner()
