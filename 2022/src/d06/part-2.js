import getSignal from './common'
import { sliceIntoChunks, hasRepeatedChars } from '../common/strings'

export default async (puzzle) => new Promise((resolve) => {
  // Get signal
  const [signal] = getSignal(puzzle)

  // Identify first marker
  const chunks = sliceIntoChunks(signal, 14, { backward: 13 })
  const firstPacketStartIndex = chunks.findIndex(
    (str) => !hasRepeatedChars(str)
  )

  return resolve(14 + firstPacketStartIndex)
})