import getInstructions from './common'

const SPRITE_WIDTH = 3
const LIT_PIXEL = '#'
const DARK_PIXEL = '.'
const PRINT = []
const isPixelInSprite = (pixel, sprite) => pixel >= sprite && pixel < (sprite + SPRITE_WIDTH)

const appendCRTRow = (pixels, currentCycle, currentValue) => {
  // Append CRT row
  pixels.push(
    isPixelInSprite(currentCycle, currentValue)
      ? LIT_PIXEL
      : DARK_PIXEL
  )

  // If row is complete, print it & reset of next 40 cycles
  if (currentCycle % 40 === 0) {

    PRINT.push(pixels.join(''))
    pixels.length = 0
    return 0

  }
  return currentCycle
}

export default async (puzzle) => new Promise((resolve) => {

  // Get directory tree
  const instructions = getInstructions(puzzle)
  
  // Create CPU tick
  const CPU = {
    cycle: 0,
    value: 1
  }

  // Create sprite cursor
  const currentCRTRow = []

  // Iterate throughts instructions
  let i = 0
  while (instructions[i]) {

    const { instruction, value = 0 } = instructions[i]

    let cycleDuration = instruction === 'addx' ? 2 : 1
    while (cycleDuration) {

      CPU.cycle = appendCRTRow(currentCRTRow, CPU.cycle + 1, CPU.value)
      cycleDuration--

    }
    CPU.value += value
    i += 1

  }
  return resolve(`\n${PRINT.join('\n')}`)

})
