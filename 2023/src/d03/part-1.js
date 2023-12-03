const findAdjacentNumbers = (data) => {
  // Prepare array of results
  const results = []

  // Search symbols in the map
  const symbols = data.filter(({ symbol }) => !!symbol)

  let i = 0
  while (symbols[i]) {
    const { pos_x, pos_y } = symbols[i]
    results.push(
      ...data.filter((point) => {
        // Identify that could be adjacents on vertical position
        if (point.number >= 0 && !point.part_number && [pos_y - 1, pos_y, pos_y + 1].includes(point.pos_y)) {
          // Identify if the horizontal coordinates could overlaps
          const footprint = Array.from({ length: point.size }, (_, i) => point.pos_x + i)
          if (footprint.includes(pos_x - 1) || footprint.includes(pos_x) || footprint.includes(pos_x + 1)) {
            point.part_number = true
            return true
          }
        }
        return false
      })
    )
    i += 1
  }

  return results
}

export default async (puzzle) => new Promise((resolve) => {
  const lines = puzzle.split('\n')

  // Parse puzzle into coordinates of symboles & coordinates of numbers
  const map = []
  let i = 0
  while (lines[i]) {
    let j = 0
    const chars = lines[i].split('')
    while (chars[j]) {
      // In case of `.` we ignore the point
      if (chars[j] === '.') {
        j++
        continue
      }

      // In case of any symbole, we note the point down
      if (isNaN(chars[j])) {
        map.push({ pos_y: i, pos_x: j, symbol: chars[j] })
        j++
        continue
      }

      // In case of a number, we try to get the full number
      let numberStr = ''
      let size = 0
      while (chars[j + size] && !isNaN(chars[j + size])) {
        numberStr += chars[j + size]
        size++
      }
      map.push({ pos_y: i, pos_x: j, size, number: parseInt(numberStr) })
      j += size
    }
    i++
  }

  // Deduce for each symboles tha adjacent numbers
  const adjacents = findAdjacentNumbers(map)
  
  // Sum them
  return resolve(adjacents.reduce((sum, { number }) => sum += number, 0))
})