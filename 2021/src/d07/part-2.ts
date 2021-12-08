import { Resolver } from '../_types'

const computeRequiredFuels = (arr: Array<number>, position: number): number => {

  return arr.reduce((acc, curr) => {

    let diff = Math.abs(position - curr)
    while (diff) {

      acc += diff
      diff--

    }
    return acc

  }, 0)

}

// GOAL: determine the horizontal position that the crabs can align to using the least fuel possible
const resolver: Resolver = async (puzzle) => new Promise((resolve) => {

  // Build lines boards
  const [positions]: Array<string> = puzzle.split('\n')
  const crabs: Array<number> = positions.split(',').map(Number)

  // Build possible points
  let startFrom = Math.max(...crabs)
  const potentialPositions = []
  while (startFrom) {
  
    potentialPositions.push(startFrom)
    startFrom--

  }

  // Determine the minimum
  const solution = Math.min(
    ...potentialPositions.map(
      (potentialPosition) => computeRequiredFuels(crabs, potentialPosition)
    )
  )

  return resolve(`${solution}`)

})

export default resolver
