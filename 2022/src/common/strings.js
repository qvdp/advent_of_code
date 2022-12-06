const hasRepeatedChars = (str) => /(.).*\1/.test(str)

const sliceIntoChunks = (string, size, options = {}) => {

  // Parse options
  const { backward = 0, trim = false } = options

  // Build chunks
  const chunks = []
  for (let i = 0; i < string.length; i += size) {

    const chunkedStr = string.slice(i, i + size)
    chunks.push(trim ? chunkedStr.trim() : chunkedStr)
    if (backward) {
      i -= backward
    }

  }
  return chunks

}

export {
  hasRepeatedChars,
  sliceIntoChunks
}
