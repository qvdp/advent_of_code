const LINE_SEPERATOR = '\n'
const ROOT_PATH = '/'
const PARENT_DIR_PATH = '..'
const MOVE_COMMAND = 'cd'
const LIST_COMMAND = 'ls'

export default (puzzle) => {
  const lines = puzzle.split(LINE_SEPERATOR)

  // Create a batch array of ran commands
  const batch = []
  let i = 0
  while (lines[i]) {

    // Line should start with a `$` (beginning of prompt for cmd)
    const cmd = {}

    // Identify command type & path from execution
    const [cmdType, dir] = lines[i].replace('$ ', '').split(' ')
    if (dir !== ROOT_PATH) {

      const [{ absolutePath: lastCmdAbsolutePath }] = batch.slice(-1)
      const paths = lastCmdAbsolutePath.split('/')
      if (dir === PARENT_DIR_PATH) {

        paths.pop()

      } else if (dir) {

        paths.push(dir)

      }
      Object.assign(cmd, { cmdType, dir, absolutePath: paths.join('/') })
      
    } else {

      Object.assign(cmd, { cmdType, dir, absolutePath: '.' })

    }

    // Identify cmd results
    const results = []
    while (lines[i + 1] && !lines[i + 1].startsWith('$ ')) {

      i += 1
      // Push only files with their sizes
      if (!lines[i].startsWith('dir')) {

        const [size, file] = lines[i].split(' ')
        results.push({ size, file })

      }

    }
    Object.assign(cmd, { results })

    // Add new commands to batch
    batch.push(cmd)
    i += 1

  }

  // Then we build the dir tree using organized batch of commands & built absolute path
  // Prepare tree
  const tree = {}
  const moveCmds = batch.filter(({ cmdType }) => cmdType === MOVE_COMMAND)
  i = 0
  while (moveCmds[i]) {

    const { absolutePath } = moveCmds[i]
    absolutePath
      .split('/')
      .reduce(
        (nestedTree = {}, path) => {
          if (!nestedTree[path]) {
            Object.assign(nestedTree, { [path]: {}})
          }
          return nestedTree[path]
        },
        tree,
      )
    i += 1

  }
  
  // Finally we parse the built tree recursively in order to add size of each keys
  const listCmds = batch.filter(({ cmdType }) => cmdType === LIST_COMMAND)
  const fillSizeRecursively = (object, path) => {

    const [nestedKey] = path.split('/').slice(-1)
    const nestedObject = object[nestedKey]
    Object
      .entries(nestedObject)
      .filter(([, value]) => typeof value === 'object')
      .forEach(([nestedPath]) => fillSizeRecursively(nestedObject,`${path}/${nestedPath}`))

    const { results: _files } = listCmds.find(({ absolutePath }) => absolutePath === path) || {}
    if (_files) {
      const _filesSize = _files.reduce((size, { size: sizeStr }) => size += parseInt(sizeStr), 0)
      const _nestedSize = Object
        .entries(nestedObject)
        .reduce((size, [, nestedChild]) => {
          if (typeof nestedChild === 'object') {
            const { _dirSize } = nestedChild
            return size += _dirSize
          }
          return size
        }, 0)
      Object.assign(
        nestedObject,
        {
          _files,
          _filesSize,
          _dirSize: _nestedSize + _filesSize
        }
      )
    }
    return

  }

  fillSizeRecursively(tree, '.')
  return tree

}
