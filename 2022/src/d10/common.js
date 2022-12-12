const LINE_SEPERATOR = '\n'
const INSTRUCTION_SEPERATOR = ' '

export default (puzzle) => puzzle
  .split(LINE_SEPERATOR)
  .map((line) => {

    const [instruction, value = 0] = line.split(INSTRUCTION_SEPERATOR)
    return { instruction, value: parseInt(value) }

  })
