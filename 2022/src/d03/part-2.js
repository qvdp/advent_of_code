const RUCKSACKS_SEPERATOR = '\n'
const LOWERCASE_CHAR_CODE_SUBSTRACT = 96
const UPPERCASE_CHAR_CODE_SUBSTRACT = 38

const getRucksacks = (puzzle) => puzzle.split(RUCKSACKS_SEPERATOR)

const sliceIntoChunks = (arr, size) => {
  const chunks = []
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size))
  }
  return chunks
}

export default async (puzzle) => new Promise((resolve) => {
  // Get rucksacks
  const rucksacks = getRucksacks(puzzle)

  // Group by 3
  const groups = sliceIntoChunks(rucksacks, 3)

  // Find the unique char in the group
  const letters = groups.map((groupOfStr) => {
    const [first, second, third] = groupOfStr
      .map(
        (str) =>[
          ...new Set(
            str.split('').sort((a, b) => a !== b ? a < b ? -1 : 1 : 0)
          )
        ]
      )

    return first.find((char) => second.includes(char) && third.includes(char))
  })

  const values = letters.map((char) => {
    if (char === char.toUpperCase()) {
      return char.charCodeAt() - UPPERCASE_CHAR_CODE_SUBSTRACT
    }
    return char.charCodeAt() - LOWERCASE_CHAR_CODE_SUBSTRACT
  })

  return resolve(values.reduce((a, b) => a + b, 0))
})