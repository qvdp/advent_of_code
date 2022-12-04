const PARI_SEPARATOR = '\n'

export default (puzzle) => puzzle
  .split(PARI_SEPARATOR)
  .map((sectionsPairStr) => {
    const sectionsParis = sectionsPairStr.split(',')
    return sectionsParis.reduce((sectionObj = {}, sectionStr, index) => {
      const [min , max] = sectionStr.split('-')
      return Object.assign(sectionObj, { [`min${index}`]: parseInt(min), [`max${index}`]: parseInt(max) })
    }, {})
  })