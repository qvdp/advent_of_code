// GOAL: extract first & last digit of each line of puzzle and sum theme.
// in this part, digits could be spelled-out (one, two, three, four, ...)
// or numbers.
const DIGITS = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
}

export default async (puzzle) => new Promise((resolve) => {
  const regex = /(?:\d|one|two|three|four|five|six|seven|eight|nine)/g

  return resolve(
    puzzle.split('\n').reduce(
      (sum, line) => {
        const [firstMatch] = line.match(regex)
        const firstDigit = DIGITS[firstMatch] || firstMatch

        let lastMatch
        let count = -1
        while (typeof lastMatch === 'undefined') {
          if (line.slice(count).match(regex)?.length) {
            ([lastMatch] = line.slice(count).match(regex))
          }
          count--
        }
        const lastDigit = DIGITS[lastMatch] || lastMatch

        const digit = parseInt(firstDigit + lastDigit)
        sum += digit
        return sum
      },
      0
    )
  )
})