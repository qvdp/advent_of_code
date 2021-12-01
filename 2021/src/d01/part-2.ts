import { Resolver } from '../_types'

// GOAL: determine how much time the depth is increasing by batch of 3 measurements
const resolver: Resolver = async (puzzle) => new Promise((resolve) => {

  const measures: Array<string> = puzzle.split('\n')
  const batch: Array<number> = []
  let i = 0
  while (measures[i]) {

    const window0 = measures[i]
    const window1 = measures[i + 1]
    const window2 = measures[i + 2]
    if (window0 && window1 && window2) {

      batch.push(parseInt(window0) + parseInt(window1) + parseInt(window2))

    }
    i++

  }

  let counter = 0
  batch.reduce((previous: number, current: number) => {
    
    if (current > previous) {

      counter++
      
    }
    return current
  })

  return resolve(counter.toString())
})

export default resolver