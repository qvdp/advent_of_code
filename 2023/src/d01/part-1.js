// GOAL: extract first & last digit of each line of puzzle
// to generate a two digits number (`calibration value`)
// and sum.
export default async (puzzle) => new Promise((resolve) => {
  return resolve(
    puzzle.split('\n').reduce(
      (sum, line) => {
        const digits = line.replace(/\D/g, '')
        return sum + parseInt(`${digits[0]}${digits.slice(-1)}`)
      },
      0
    )
  )
})