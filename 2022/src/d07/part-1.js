import getDirTree from './common'

const MAX_SIZE = 100000

const getSize = (obj) => obj?._dirSize

const getNestedDirs = (obj) => Object.keys(obj).filter((key) => key !== '_files')

export default async (puzzle) => new Promise((resolve) => {
  // Get directory tree
  const dirTree = getDirTree(puzzle)

  // Find dirs with `_dirSize` with a total size of at most MAX_SIZE
  let totalSize = 0
  const getSizeRecursively = (obj) => {

    if (obj && typeof obj === 'object') {

      const currentSize = getSize(obj)
      if (currentSize && currentSize <= MAX_SIZE) {

        totalSize += currentSize

      }
      getNestedDirs(obj).forEach((path) => getSizeRecursively(obj[path]))

    }

  }
  getSizeRecursively(dirTree)

  return resolve(totalSize)
})