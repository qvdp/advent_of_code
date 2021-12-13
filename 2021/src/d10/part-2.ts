import { Resolver, StringMap, NumberMap } from '../_types'

const _CHARS: StringMap = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>'
}
const _SCORES: NumberMap = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4
}

// GOAL: determine the total syntax error score
const resolver: Resolver = async (puzzle) => new Promise((resolve) => {

  // Build map from entieres
  const entries: Array<string> = puzzle.split('\n')

  // Loop throught each entry & find lines to discard
  const linesToDiscard: Array<string> = []
  const beginningChars: Array<string> = Object.keys(_CHARS)
  const endingChars: Array<string> = Object.values(_CHARS)
  entries.forEach((entry: string) => {

    let expectedStr = ''
    let i = 0
    while (entry[i]) {

      const char = entry[i]
      if (beginningChars.includes(char)) {

        expectedStr = _CHARS[char] + expectedStr

      } else if (endingChars.includes(char)) {

        const [expected] = expectedStr
        expectedStr = expectedStr.substring(1)
        if (char !== expected) {

          linesToDiscard.push(entry)
          break

        }

      }
      i++

    }

  })
  const remainingLines = entries.filter((str) => !linesToDiscard.includes(str))
  
  // Loop throught remaining lines & complete each lines
  const linesCompletion: Array<string> = []
  remainingLines.forEach((entry) => {

    let expectedStr = ''
    let i = 0
    while (entry[i]) {

      const char = entry[i]
      if (beginningChars.includes(char)) {

        expectedStr = _CHARS[char] + expectedStr

      } else if (endingChars.includes(char)) {

        expectedStr = expectedStr.substring(1)

      }
      i++

    }
    linesCompletion.push(expectedStr)

  })
  const scores = linesCompletion
    .map((str: string) => {
      let tmp = 0
      str.split('').forEach((char) => {
        tmp = (tmp * 5) + _SCORES[char]
      })
      return tmp
    })
    .sort((a, b) => a - b)

  return resolve(`${scores[Math.floor(scores.length / 2)]}`)

})

export default resolver
