import { join } from 'path'
import getPuzzle from './puzzle-parser'

(async () => {
  // Parse data from command line & retrieve corresponding puzzle
  const [day = '', part = ''] = process.argv.slice(2)
  const puzzle: string = await getPuzzle(join(__dirname, '_puzzles', day, part))
  
  // Get corresponding resolver
  const { default: resolver } = await import(join(__dirname, day, `${part}.ts`))

  // Prepare request timer
  const timer: [number, number] = process.hrtime()

  // Solve puzzle
  const result: string = await resolver(puzzle)

  // Print results
  console.log(`[${day}/${part}] Solved in ${Math.ceil((process.hrtime(timer)[0] * 1000000000 + process.hrtime(timer)[1]) / 1e6)}ms, answer is`, result)
})()