import { Resolver, Coordinate } from '../_types'

const dispatch = (map: Array<Array<number>>, from: Coordinate): void => {

  // Dispatch where it is possible only
  const { i, j } = from
  const maxHeight = map.length - 1
  const maxLength = map[0].length - 1

  i > 0 && energize(map, { i: i - 1, j })
  i > 0 && j < maxLength && energize(map, { i: i - 1, j: j + 1 })
  i > 0 && j > 0 && energize(map, { i: i - 1, j: j - 1 })  
  j < maxLength && energize(map, { i, j: j + 1 })
  j > 0 && energize(map, { i, j: j - 1 })
  i < maxHeight && energize(map, { i: i + 1, j })
  i < maxHeight && j > 0 && energize(map, { i: i + 1, j: j - 1 })
  i < maxHeight && j < maxLength && energize(map, { i: i + 1, j: j + 1 })

}
const energize = (map: Array<Array<number>>, { i, j }: Coordinate): void => {

  // Stop condition is: current point has already flashed
  if (map[i][j] === 10) {
    return
  }

  // Increase current point
  map[i][j]++

  // Stop condition is: current point can still energized
  if (map[i][j] <= 9) {
    return
  }

  // Dispatch energy to other points
  dispatch(map, { i, j })

}

// GOAL: determine how many total flashes are there after 100 steps
const resolver: Resolver = async (puzzle) => new Promise((resolve) => {

  // Build map from entieres
  const entries = puzzle.split('\n')
  const map: Array<Array<number>> = entries.map((entry: string) => entry.split('').map(Number))
  let counter = 0
  let k = 100
  while (k) {

    // Energize all points
    let i = 0
    while (map[i]) {

      let j = 0
      while (map[i][j] >= 0) {

        energize(map, { i, j })
        j++

      }
      i++

    }

    // Reset flashed points
    i = 0
    while (map[i]) {

      let j = 0
      while (map[i][j] >= 0) {

        if (map[i][j] === 10) {
          counter++
          map[i][j] = 0
        }
        j++

      }
      i++
    }
    k--

  }

  // Return flash counter
  return resolve(`${counter + 1}`)

})

export default resolver
