import { join } from 'path'
import getPuzzle from './puzzle-parser'

(async () => {
  // Parse data from command line & retrieve corresponding puzzle
  const [day = '', part = ''] = process.argv.slice(2)
  const puzzle = await getPuzzle(join(__dirname, '_puzzles', day, part))
  
  // Get corresponding resolver
  const { default: resolver } = await import(join(__dirname, day, `${part}.ts`))

  // Prepare request timer
  const timer = process.hrtime()

  // Solve puzzle
  const result = await resolver(puzzle)

  // Print results
  console.log(`[${day}/${part}] Solved in ${Math.ceil(process.hrtime(timer)[1] / 1e6)}ms, answer is`, result)
})()