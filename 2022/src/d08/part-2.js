import getTreesMap from './common'

const calculateScenicScore = (tree) => {

  const { height, ...directions } = tree
  return Object
    .values(directions)
    .reduce(
      (acc, direction) => {

        let i = 0
        let score = 1
        while (direction[i + 1] && parseInt(direction[i]) < height) {

          score += 1
          i += 1

        }
        return acc *= score

      },
      1
    )

}

export default async (puzzle) => new Promise((resolve) => {

  // Get directory tree
  const trees = getTreesMap(puzzle)

  // Calculate scenic score of each trees
  const scores = trees.map(calculateScenicScore)

  return resolve(Math.max(...scores))

})
