import { Resolver, StringMap, NumberMap } from '../_types'

const _CHARS: StringMap = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>'
}
const _SCORES: NumberMap = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137
}

// GOAL: determine the total syntax error score
const resolver: Resolver = async (puzzle) => new Promise((resolve) => {

  // Build map from entieres
  const entries: Array<string> = puzzle.split('\n')
  
  // Loop throught each entry & find the error characters first position
  const errors: Array<string> = []
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

          errors.push(char)
          break

        }

      }
      i++

    }

  })

  return resolve(`${errors.reduce((acc: number, char: string) => acc += _SCORES[char], 0)}`)

})

export default resolver
