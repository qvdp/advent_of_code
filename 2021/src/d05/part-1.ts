import { Resolver, Line } from '../_types'

const parseLines = (arr: Array<string>): Array<Line> => {

  return arr.map((line: string) => {

    const [startPoint, endPoint] = line.split(' -> ')
    const lineObject: Line = {
      start: startPoint.split(',').map(Number),
      end: endPoint.split(',').map(Number),
      originalStr: line
    }
    return lineObject

  })

}

const drawMap = (lines: Array<Line>) => {

  // Get xmax and ymax to determine array sizes
  const xMax = Math.max(
    ...new Set([
      ...lines.map(({ start: [x] }) => x ),
      ...lines.map(({ end: [x] }) => x)
    ])
  )
  const yMax = Math.max(
    ...new Set([
      ...lines.map(({ start: [,x] }) => x),
      ...lines.map(({ end: [,x] }) => x)
    ])
  )
  
  // Fill array with '⬛️' char
  const map: Array<Array<string>> = Array.from(Array(yMax + 1), () => new Array(xMax + 1).fill('⬛️'))

  // Draw all lines in '⬜️'
  // /!\ x=0 represent the first element from sub array
  // /!\ y=0 represent the first element from main array
  lines.forEach(({ start: [xStart, yStart], end: [xEnd, yEnd] }) => {

    // Draw vertical lines
    if (xStart === xEnd) {

      const from = Math.min(yStart, yEnd)
      const diff = yStart - yEnd
      let i = 0
      while (i <= Math.abs(diff)) {

        map[from + i][xStart] = ['⬜️', '🟧'].includes(map[from + i][xStart]) ? '🟧' : '⬜️'
        i++

      }

    }

    // Draw horizontal lines
    if (yStart === yEnd) {

      const from = Math.min(xStart, xEnd)
      const diff = xStart - xEnd
      let i = 0
      while (i <= Math.abs(diff)) {

        map[yStart][from + i] = ['⬜️', '🟧'].includes(map[yStart][from + i]) ? '🟧' : '⬜️'
        i++

      }

    }

  })
  return map

}

// GOAL: determine how many points do at least two lines overlap
const resolver: Resolver = async (puzzle) => new Promise((resolve) => {

  // Build lines boards
  const coordinates: Array<string> = puzzle.split('\n')
  const lines: Array<Line> = parseLines(coordinates)

  // Find overlapping lines (only considering vertical & horizontal lines)
  const map: Array<Array<string>> = drawMap(lines)

  // Count the number of overlapping lines & print results
  let counter = 0
  map.forEach((line) => {

    line.forEach((val) => {

      counter += val === '🟧' ? 1 : 0

    })
    // console.log(line.join(''))

  })
  return resolve(`${counter}`)

})

export default resolver
