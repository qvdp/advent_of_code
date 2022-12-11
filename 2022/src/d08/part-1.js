import getTreesMap from './common'

const isVisibleFromAnEdge = (tree) => {

  const { height, ...directions } = tree
  return Object
    .values(directions)
    .some(
      (direction) => direction.every((treeHeight) => height > parseInt(treeHeight))
    )

}

const getTreesOnEdge = ([tree]) => {

  const { height, ...directions } = tree
  return (Object.values(directions).reduce((acc, direction) => acc += direction.length, 0) * 2)

}

export default async (puzzle) => new Promise((resolve) => {

  // Get directory tree
  const trees = getTreesMap(puzzle)

  // Isolate visible trees
  const visibleTrees = trees.filter(isVisibleFromAnEdge).length
  const edgeTrees = getTreesOnEdge(trees)

  return resolve(visibleTrees + edgeTrees)

})
