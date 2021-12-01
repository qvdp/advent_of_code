import { Resolver } from '../_types'

// GOAL: determine how much time the depth is increasing
const resolver: Resolver = async (puzzle) => new Promise((resolve) => {

  const measures: Array<string> = puzzle.split('\n')
  let counter = 0
  measures.reduce((previous: string, current: string) => {
    
    if (parseInt(current) > parseInt(previous)) {

      counter++
      
    }
    return current
  })

  return resolve(counter.toString())
})

export default resolver