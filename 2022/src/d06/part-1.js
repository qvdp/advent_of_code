import getSignal from './common'
import { sliceIntoChunks, hasRepeatedChars } from '../common/strings'

export default async (puzzle) => new Promise((resolve) => {
  // Get signal
  const [signal] = getSignal(puzzle)

  // Identify first marker
  const chunks = sliceIntoChunks(signal, 4, { backward: 3 })
  const firstPacketStartIndex = chunks.findIndex(
    (str) => !hasRepeatedChars(str)
  )

  return resolve(4 + firstPacketStartIndex)
})