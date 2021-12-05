import { Resolver, NumberMap } from '../_types'

// GOAL: determine the gamma & epsilon rates
const highest = (arr: Array<string>): string => {

  const map: NumberMap = arr.reduce((acc: NumberMap, curr: string) => {

    acc[curr] = (acc[curr] || 0) + 1
    return acc

  }, {})
  const max = Math.max(...Object.values(map))
  return Object.keys(map).find((key) => map[key] === max) || ''

}

const resolver: Resolver = async (puzzle) => new Promise((resolve) => {

  const binaries: Array<string> = puzzle.split('\n')
  const byteLength = binaries[0].length
  let gammaByte = ''
  let i = 0
  while (i < byteLength) {

    gammaByte = `${gammaByte}${highest(binaries.map((binary) => binary[i]))}`
    i++

  }
  const epsilonByte = gammaByte
    .split('')
    .map((c: string) => c === '0' ? '1' : '0')
    .join('')

  return resolve((parseInt(gammaByte, 2) * parseInt(epsilonByte, 2)).toString())

})

export default resolver
