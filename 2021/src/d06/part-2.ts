import { Resolver, NumberMap } from '../_types'

// Compute reproduction cycle of lantern fish at X days
const computeReproductionCycle = (startingFrom: number, days: number): number => {
  
  // Simulate fishes birth
  const fishes = [startingFrom]
  while (days) {

    let birthsCounter = 0
    let numberOfFishes = fishes.length
    while (numberOfFishes) {

      const fish = fishes[numberOfFishes - 1]
      const newCounter = fish - 1
      if (newCounter < 0) {

        birthsCounter++

      }
      fishes[numberOfFishes - 1] = newCounter >= 0 ? newCounter : 6
      numberOfFishes--

    }
    while (birthsCounter) {
      fishes.push(8)
      birthsCounter--
    }
    days--

  }
  return fishes.length

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

  // For each sort of fish, determine its reproduction cycle
  const days = 250
  const reproductionCycleMap: NumberMap = {}
  console.log(fishMap)
  Object.keys(fishMap).forEach((fishSort) => {

    Object.assign(reproductionCycleMap, { [fishSort]: computeReproductionCycle(+fishSort, days) })

  })

  // Sum reproduction cycles map of each fishes
  let solution = 0
  Object.keys(fishMap).forEach((fishSort) => {

    solution += fishMap[fishSort] * reproductionCycleMap[fishSort]

  })
  return resolve(`${solution}`)

})

export default resolver