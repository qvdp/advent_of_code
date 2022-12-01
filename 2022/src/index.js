import { join } from 'path'
import getPuzzle from './puzzle-parser'

export default async (day, part) => {
  // Parse data from command line & retrieve corresponding puzzle
  const puzzle = await getPuzzle(join(process.cwd(), 'src', day, 'puzzle'))
  
  // Get corresponding resolver
  const { default: resolver } = await import(join(process.cwd(), 'src', day, `${part}.js`))

  // Prepare request timer
  const timer = process.hrtime()

  // Solve puzzle
  const result = await resolver(puzzle)

  // Print results
  console.log(`[${day}/${part}] Solved in ${Math.ceil((process.hrtime(timer)[0] * 1000000000 + process.hrtime(timer)[1]) / 1e6)}ms, answer is`, result)
}
