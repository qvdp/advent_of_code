import run from "aocrunner"

export type Units = {
  input: string;
  part1: string;
  part2: string;
}

export default class Day {
  /** INTERNAL **/
  day: number;
  units: Units[];

  /** _EXTERNAL **/
  _parser: Function;
  _solverPart1: Function;
  _solverPart2: Function;

  constructor(day: number, units: Units[], _parser: Function, _solverPart1: Function, _solverPart2: Function) {
    this.day = day
    this.units = units
    this._parser = _parser
    this._solverPart1 = _solverPart1
    this._solverPart2 = _solverPart2
  }

  runner() {
    run({
      part1: {
        tests: this
          .units
          .map(({ input, part1: expected }) => ({ input, expected})),
        solution: (input) => {
          const parsedInput = this._parser(input)
          return this._solverPart1(parsedInput)
        },
      },
      part2: {
        tests: this
          .units
          .map(({ input, part2: expected }) =>({ input, expected })),
        solution: (input) => {
          const parsedInput = this._parser(input)
          return this._solverPart2(parsedInput)
        },
      },
      trimTestInputs: true,
      onlyTests: false,
    })
  }
}
