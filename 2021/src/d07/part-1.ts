import { Resolver } from '../_types'

const computeRequiredFuels = (arr: Array<number>, position: number) => {

  return arr.reduce((acc, curr) => {
    
    return acc += Math.abs(position - curr)
    
  }, 0)

}

// GOAL: determine the horizontal position that the crabs can align to using the least fuel possible
const resolver: Resolver = async (puzzle) => new Promise((resolve) => {

  // Build lines boards
  const [positions] = puzzle.split('\n')
  const crabs = positions.split(',').map(Number)

  // Determine the minimum
  const solution = Math.min(
    ...crabs.map(
      (potentialPosition) => computeRequiredFuels(crabs, potentialPosition)
    )
  )

  return resolve(`${solution}`)

})

export default resolver
