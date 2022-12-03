const RUCKSACKS_SEPERATOR = '\n'
const LOWERCASE_CHAR_CODE_SUBSTRACT = 96
const UPPERCASE_CHAR_CODE_SUBSTRACT = 38

const getRucksacks = (puzzle) => puzzle.split(RUCKSACKS_SEPERATOR)

export default async (puzzle) => new Promise((resolve) => {
  const rucksacks = getRucksacks(puzzle)

  // Isolate letters from each strings
  const letters = rucksacks.map((str) => {
    const firstHalf = str.slice(0, str.length / 2)
    const secondHalf = str.slice(str.length / 2, str.length)
    return secondHalf.split('').find((char) => firstHalf.includes(char))
  })

  const values = letters.map((char) => {
    if (char === char.toUpperCase()) {
      return char.charCodeAt() - UPPERCASE_CHAR_CODE_SUBSTRACT
    }
    return char.charCodeAt() - LOWERCASE_CHAR_CODE_SUBSTRACT
  })

  return resolve(values.reduce((a, b) => a + b, 0))
})