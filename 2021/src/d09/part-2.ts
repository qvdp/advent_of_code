import { Resolver, Coordinate } from '../_types'

const getMinPoints = (map: Array<Array<number>>): Array<Coordinate> => {

  const solutions: Array<Coordinate> = []
  let i = 0
  while (map[i]) {

    let j = 0
    while (map[i][j] >= 0) {

      const top = map[i - 1] && map[i - 1][j] >= 0 ? map[i - 1][j] : 10
      const bottom = map[i + 1] && map[i + 1][j] >= 0 ? map[i + 1][j] : 10
      const left = map[i][j - 1] >= 0 ? map[i][j - 1] : 10
      const right = map[i][j + 1] >= 0 ? map[i][j + 1] : 10
      if ([top, bottom, left, right].every((height) => height > map[i][j])) {

        solutions.push({ i, j })

      }
      j++

    }
    i++

  }
  return solutions

}

const getPointBassin = (map: Array<Array<number>>, coordinate: Coordinate): Array<Coordinate> => {

  const visited: Array<Coordinate> = []
  const bassin: Array<Coordinate> = []
  const recursive = (map: Array<Array<number>>, coordinate: Coordinate): void => {
    
    // Stop condition: point does not exist or is 9 or is already visited
    const { i, j } = coordinate
    const current = map[i] && map[i][j] >= 0 && map[i][j] < 9 ? map[i][j] : 9
    if (!visited.find((point) => point.i === i && point.j === j)) {

      // Check surrounding points
      visited.push({ i, j })
      if (current !== 9) {

        bassin.push({ i, j })
        recursive(map, { i: i + 1, j })
        recursive(map, { i: i - 1, j })
        recursive(map, { i, j: j + 1 })
        recursive(map, { i, j: j - 1 })

      }

    }

  }
  recursive(map, coordinate)
  return bassin

}

// GOAL: determine how many times do digits 1, 4, 7, or 8 appear
const resolver: Resolver = async (puzzle) => new Promise((resolve) => {

  // Build map from entieres
  const entries = puzzle.split('\n')
  const map: Array<Array<number>> = entries.map((entry: string) => entry.split('').map(Number))

  // Find minimum coordinates
  const minimums: Array<Coordinate> = getMinPoints(map)

  // Loop throught each minimum point & compute its bassin
  const bassins: Array<number> = minimums
    .map((point: Coordinate) => getPointBassin(map, point))
    .map((bassin: Array<Coordinate>) => bassin.length)
  
  // Find the 3 largest bassin
  const [first, second, third] = bassins.sort((a, b) => b - a)
  return resolve(`${first * second * third}`)

})

export default resolver
