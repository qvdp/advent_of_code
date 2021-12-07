import { Resolver } from '../_types'

// Transform array sequences after one iteration
const transformArray = (arr: Array<number>): Array<number> => {

  const births: Array<number> = []
  const newArray = arr.map((fish) => {

    const newCounter = fish - 1
    if (newCounter < 0) {

      births.push(8)
      return 6
    }
    return newCounter

  })
  return [...newArray, ...births]
}

// GOAL: determine the number of lanternfish after an amount of days
const resolver: Resolver = async (puzzle) => new Promise((resolve) => {

  // Build lines boards
  const [lanternFishList]: Array<string> = puzzle.split('\n')
  let fishes: Array<number> = lanternFishList.split(',').map(Number)

  // Simulate fishes birth
  const days = 250
  let i = 0
  while (i < days) {

    fishes = transformArray(fishes)
    i++

  }
  
  return resolve(`${fishes.length}`)

})

export default resolver
