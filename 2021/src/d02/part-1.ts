import { Resolver, NumberMap } from '../_types'

// GOAL: determine the moves of submarine
const resolver: Resolver = async (puzzle) => new Promise((resolve) => {

  const orders: Array<string> = puzzle.split('\n')
  const moves: NumberMap = {
    forward: 0,
    down: 0,
    up: 0
  }
  orders.forEach((order: string) => {
    const [direction, number] = order.split(' ')
    moves[direction] += +number
  })

  return resolve((moves.forward * (moves.down - moves.up)).toString())
})

export default resolver
