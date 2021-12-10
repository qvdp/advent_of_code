import { Resolver, NumberMap } from '../_types'

// Compute reproduction cycle of lantern fish at X days
const computeReproductionCycle = (startingFrom: Array<number>, days: number): Array<number> => {
  
  // Simulate fishes birth
  while (days) {

    // Determine number of new fish
    const [births] = startingFrom

    // Translate birth counter
    let i = 0
    while (startingFrom[i + 1] >= 0) {

      startingFrom[i] = startingFrom[i + 1]
      i++

    }

    // Append new birth
    startingFrom.splice(-1, 1, births) 
    startingFrom[6] += births
    days--

  }
  return startingFrom

}

// GOAL: determine the number of lanternfish after an amount of days
const resolver: Resolver = async (puzzle) => new Promise((resolve) => {

  // Build lines boards
  const [lanternFishList]: Array<string> = puzzle.split('\n')
  const fishes: Array<number> = lanternFishList.split(',').map(Number)

  // Sort array
  const sortedArray = fishes.sort((a, b) => a - b)

  // Count number of each sort of fish
  const fishMap: NumberMap = sortedArray.reduce((acc: NumberMap, curr: number) => {

    if (!acc[curr.toString()]) {

      acc[curr.toString()] = 1
      return acc

    }
    acc[curr.toString()] += 1
    return acc

  }, {})

  // Build array of fishes
  const arr = new Array(9).fill(0)
  Object.keys(fishMap).forEach((fishSort) => {

    arr[+fishSort] = fishMap[+fishSort]

  })
  
  // Solve problem
  const days = 256
  const solutions = (computeReproductionCycle(arr, days))
  
  return resolve(`${solutions.reduce((prev, curr) => prev + curr)}`)

})

export default resolver