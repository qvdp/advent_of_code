import { Resolver, ArrayStringMap } from '../_types'

const _SIGNALS = 'abcdefg'

const permutate = (string: string): Array<string> => {

  const result = new Set('')
  permutationHelper(string, result, 0);

  return Array.from(result)
}

const permutationHelper = (string: string, result: Set<string>, left: number) => {

  if (left === string.length - 1) {

    result.add(string)

  } else {

    for (let right = left; right < string.length; right++) {

      string = swap(string, left, right) //choose
      permutationHelper(string, result, left + 1) // explore
      string = swap(string, left, right) //unchoose

    }
  }
}

const swap = (string: string, left: number, right: number) => {

  const tmpString = string.split('')
  const tmp = tmpString[left]
  tmpString[left] = tmpString[right]
  tmpString[right] = tmp
  return tmpString.join('')

}

// GOAL: determine the four dight from unique signal patterns
const resolver: Resolver = async (puzzle) => new Promise((resolve) => {

  // Build lines boards
  const entries = puzzle.split('\n')

  // Define all possible of signals permutations
  const permutations = permutate(_SIGNALS)


  // Loop through each entries & determine the four digits
  let solution = 0
  let i = 0
  while (entries[i]) {

    // Parse orginale string
    const [patternStr, digitsString] = entries[i].split(' | ')
    const digits = digitsString.split(' ')
    const patterns = patternStr.split(' ')

    // Find the right combination among all permutations that
    // solve our problem
    let j = 0
    while (permutations[j]) {

      // Split combination
      const [_T, _C, _B, _TL, _TR, _BL, _BR] = permutations[j].split('')

      // Build list of anaogic numbers from given signals
      const analogs: ArrayStringMap = {
        '0': [_T, _B, _TL, _TR, _BL, _BR],
        '1': [_TR, _BR],
        '2': [_T, _C, _B, _TR, _BL],
        '3': [_T, _C, _B, _TR, _BR],
        '4': [_TL, _C, _TR, _BR],
        '5': [_T, _TL, _C, _BR, _B],
        '6': [_T, _TL, _C, _BR, _BL, _B],
        '7': [_T, _TR, _BR],
        '8': [_T, _TR, _TL, _C, _BR, _BL, _B],
        '9': [_T, _TR, _TL, _C, _BR, _B]
      }

      // Ensure we can find the 10 numbers in the pattern & computed digits
      if (
        Object.keys(analogs).every(
          (number: string) => patterns.find(
            (pattern: string) => analogs[number].length === pattern.length && analogs[number].every((c) => pattern.includes(c)))
        )
      ) {

        solution += +digits.map(
          (digit: string) => Object.keys(analogs).find(
            (number: string) => analogs[number].length === digit.length && analogs[number].every((c) => digit.includes(c))
          ) || ''
        ).join('')
        break

      }
      j++

    }
    i++

  }
  return resolve(`${solution}`)

})

export default resolver
