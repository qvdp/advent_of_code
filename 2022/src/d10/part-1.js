import getInstructions from './common'

const DESIRED_SIGNALS = [20, 60, 100, 140, 180, 220]

export default async (puzzle) => new Promise((resolve) => {

  // Get directory tree
  const instructions = getInstructions(puzzle)
  
  // Create CPU tick
  const CPU = {
    cycle: 0,
    value: 1,
    history: []
  }

  // Iterate throughts instructions
  let i = 0
  while (instructions[i]) {

    const { instruction, value = 0 } = instructions[i]

    let cycleDuration = instruction === 'addx' ? 2 : 1
    while (cycleDuration) {
      CPU.cycle += 1
      CPU.history.push({ ...CPU })
      cycleDuration--
    }
    CPU.value += value
    i += 1

  }
  return resolve(
    DESIRED_SIGNALS.reduce(
      (acc, signal) => {
        const signalCycle = CPU.history.find(({ cycle }) => cycle === signal)
        return acc += (signalCycle.value * signal)
      },
      0
    )
  )

})
