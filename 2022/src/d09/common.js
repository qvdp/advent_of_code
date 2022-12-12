const LINE_SEPERATOR = '\n'
const INSTRUCTION_SEPERATOR = ' '

export default (puzzle) => puzzle
  .split(LINE_SEPERATOR)
  .map((instruction) => {

    const [direction, move] = instruction.split(INSTRUCTION_SEPERATOR)
    return { direction, move: parseInt(move) }

  })
