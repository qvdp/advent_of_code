import { Resolver, NumberMap } from '../_types'

// GOAL: determine the moves of submarine included aim parameter
// down X increases your aim by X units.
// up X decreases your aim by X units.
// forward X does two things:
// It increases your horizontal position by X units.
// It increases your depth by your aim multiplied by X.
const resolver: Resolver = async (puzzle) => new Promise((resolve) => {

  const orders: Array<string> = puzzle.split('\n')
  const moves: NumberMap = {
    horizontal: 0,
    depth: 0,
    aim: 0
  }
  let i = 0
  while (orders[i]) {

    const [direction, number] = orders[i].split(' ')
    if (['down', 'up'].includes(direction)) {
      
      moves.aim += direction === 'down' ? +number : +number * -1

    } else {

      moves.horizontal += +number // foward only
      moves.depth += +number * moves.aim

    }
    i++

  }

  return resolve((moves.horizontal * moves.depth).toString())
})

export default resolver
