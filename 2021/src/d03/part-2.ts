import { Resolver } from '../_types'

// GOAL: determine the 02 & C02 rates
const rate = (arr: Array<string>, most: boolean, index: number): Array<string> => {

  // Find the most common bit at index position
  if (arr.length > 1) {

    const zero = arr.filter((el: string) => el[index] === '0')
    const one = arr.filter((el: string) => el[index] === '1')
    if (most) {

      return one.length >= zero.length ? one : zero

    } else {

      return zero.length <= one.length ? zero : one

    }

  }
  return arr

}

const resolver: Resolver = async (puzzle) => new Promise((resolve) => {

  const binaries: Array<string> = puzzle.split('\n')
  const byteLength = binaries[0].length

  // Filter binaries to determine oxygen rate & co2 rate
  let oxygenBinaries = [...binaries]
  let carbonBinaries = [...binaries]
  let i = 0
  while (i < byteLength) {

    oxygenBinaries = rate([...oxygenBinaries], true, i)
    carbonBinaries = rate(carbonBinaries, false, i)
    i++

  }
  return resolve((parseInt(oxygenBinaries[0], 2) * parseInt(carbonBinaries[0], 2)).toString())

})

export default resolver
