import { getStacks, getMoves } from './common'

export default async (puzzle) => new Promise((resolve) => {
  // Get stacks & moves
  const stacks = getStacks(puzzle)
  const moves = getMoves(puzzle)
  
  // Apply moves on stacks
  let i = 0
  while(moves[i]) {
    const { move, from, to } = moves[i]
    const movedCrates = stacks[from - 1].splice(0, move)
    stacks[to - 1].unshift(...movedCrates)
    i += 1
  }

  return resolve(stacks.map((crates) => crates[0] || '').join(''))
})