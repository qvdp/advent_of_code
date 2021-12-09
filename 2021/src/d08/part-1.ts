import { Resolver } from '../_types'

// GOAL: determine how many times do digits 1, 4, 7, or 8 appear
const resolver: Resolver = async (puzzle) => new Promise((resolve) => {

  // Build lines boards
  const entries = puzzle.split('\n')

  // Prepare searched elements length
  const searchedLength = {
    '1': 2,
    '4': 4,
    '7': 3,
    '8': 7
  }

  // Determine the minimum
  let counter = 0
  let i = 0
  while (entries[i]) {

    const [, digitsString] = entries[i].split('|')
    const digits = digitsString.split(' ').filter((digit) => !!digit)
    counter += digits.reduce((acc, curr) => {

      const match = Object.values(searchedLength).includes(curr.length)
      acc += match ? 1 : 0
      return acc

    }, 0)
    i++

  }
  return resolve(`${counter}`)

})

export default resolver
