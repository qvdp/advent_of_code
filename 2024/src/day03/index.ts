import Day, { Units } from '../utils/_day-factory.js'

/**
 * Represents an operation.
 * @typedef {Object} Lists
 * @property {string} operator - Operation sign.
 * @property {number[]} operands - Operation members (operands).
 */
type Operation = {
  enabled?: boolean,
  operator: string,
  operands: number[]
}

type Puzzle = {
  part1: Operation[],
  part2: Operation[]
}

const AOC_EXAMPLE = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`

// Prepare a set of unit tests with their solution on both solvers
const _units: Units[] = [
  {
    input: AOC_EXAMPLE,
    part1: '161',
    part2: '48'
  }
]

const _getOperationsFromStr = (str: string): Operation[] => (str.match(/mul\(\d+,\d+\)/g) || []).map(
  (operation) => ({
    enabled: true,
    operator: '*',
    operands: operation.replace(/.*?mul\(/g, '').replace(')', '').split(',').map(Number)
  })
)

/**
 * Parses the input string into a Lists object.
 * @param {Operation[]} puzzle - The raw input string containing pairs of numbers.
 * @returns {Lists} The parsed lists of numbers.
 * @private
 */
const _parseInput = (raw: string): Puzzle => {
  const puzzle: Puzzle = {
    part1: [],
    part2: []
  }

  // Isolate all mul() strs
  puzzle.part1 = _getOperationsFromStr(raw)

  // Determine all do() and don't() position to slice the raw string in doable string
  let isOperationAllowed = true
  const operations: Operation[] = []

  // Use a regular expression to find all matches for 'do()', 'don't()', and 'mul(x,y)' patterns in the raw string
  const pattern = /do\(\)|don't\(\)|mul\(\d+,\d+\)/mg
  const matches = raw.matchAll(pattern)

  for (const match of matches) {
    const [command] = match

    // Check the type of command and update the flag or add operations accordingly
    if (command === 'do()') {
      isOperationAllowed = true
    } else if (command === 'don\'t()') {
      isOperationAllowed = false
    } else if (isOperationAllowed) {
      // Extract operation from string and add to operations if allowed
      const [operation] = _getOperationsFromStr(command)
      operations.push(operation)
    }
  }
  puzzle.part2 = operations

  return puzzle
}

const _multiply = (operands: number[]) => operands[0] * operands[1]

/**
 * Solves part 1 of the puzzle.
 * @param {string} rawInput - The raw input string.
 * @returns {number} The result of part 1 calculation.
 */
const _solverPart1 = (puzzle: Puzzle) => {
  return puzzle.part1.reduce((sum, { operands }) => sum += _multiply(operands), 0).toString()
}

/**
 * Solves part 2 of the puzzle.
 * @param {Operation[]} rawInput - The raw input string.
 * @returns {number} The result of part 2 calculation.
 */
const _solverPart2 = (puzzle: Puzzle) => {
  return puzzle.part2.reduce((sum, { operands }) => sum += _multiply(operands), 0).toString()
}

new Day(3, _units, _parseInput, _solverPart1, _solverPart2).runner()
