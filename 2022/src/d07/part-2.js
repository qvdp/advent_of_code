import getDirTree from './common'

const TOTAL_SIZE = 70000000
const REQUIRED_SIZE = 30000000

const getSize = (obj) => obj?._dirSize

const getNestedDirs = (obj) => Object.keys(obj).filter((key) => key !== '_files')

export default async (puzzle) => new Promise((resolve) => {
  // Get directory tree
  const dirTree = getDirTree(puzzle)

  // Get current used space (root `dirSize`)
  const { _dirSize: currentUsedSize } = dirTree['.']
  const sizeToClean = REQUIRED_SIZE - (TOTAL_SIZE - currentUsedSize)
  
  // Find directories that can be sized enough to be removed
  const matchingSizes = []
  const getRemovableDirSizes = (obj) => {

    if (obj && typeof obj === 'object') {

      const currentSize = getSize(obj)
      if (currentSize && currentSize >= sizeToClean) {

        matchingSizes.push(currentSize)

      }
      getNestedDirs(obj).forEach((path) => getRemovableDirSizes(obj[path]))

    }

  }
  getRemovableDirSizes(dirTree)
  return resolve(Math.min(...matchingSizes))

})