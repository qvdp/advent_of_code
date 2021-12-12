import { Resolver } from '../_types'

// GOAL: determine how many times do digits 1, 4, 7, or 8 appear
const resolver: Resolver = async (puzzle) => new Promise((resolve) => {

  // Build map from entieres
  const entries = puzzle.split('\n')
  const map = entries.map((entry) => entry.split('').map(Number))
  
  // Loop throught each point & verify its position
  const solutions = []
  let i = 0
  while (map[i]) {

    let j = 0
    while (map[i][j] >= 0) {
      
      const top = map[i - 1] && map[i - 1][j] >= 0 ? map[i - 1][j] : 10
      const bottom = map[i + 1] && map[i + 1][j] >= 0 ? map[i + 1][j] : 10
      const left = map[i][j - 1] >= 0 ? map[i][j - 1] : 10
      const right = map[i][j + 1] >= 0 ? map[i][j + 1] : 10
      if ([top, bottom, left, right].every((height) => height > map[i][j])) {

        solutions.push(map[i][j])

      }
      j++

    }
    i++

  }
  return resolve(`${solutions.reduce((prev, curr) => prev + (curr + 1), 0)}`)

})

export default resolver
