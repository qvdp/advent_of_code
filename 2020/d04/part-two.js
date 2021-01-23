const fs = require('fs')
const keys = {
  byr: { onlyDigit: true, length: 4, least: 1920, most: 2002 },
  iyr: { onlyDigit: true, length: 4, least: 2010, most: 2020 },
  eyr: { onlyDigit: true, length: 4, least: 2020, most: 2030 },
  hgt: {
    numberFollowedBy: [
      { key: 'cm', least: 150, most: 193 },
      { key: 'in', least: 59, most: 76 }
    ]
  },
  hcl: { first: '#', length: 7, onlyHexa: true },
  ecl: { isIn: ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'] },
  pid: { onlyDigit: true, length: 9 },
  cid: {}
}

const validators = {
  onlyDigit: (value) => !!(/^\d+$/.test(value)),
  onlyHexa: (value) => !!(/^#[0-9a-f]{6}$/i.test(value)),
  length: (value, rule) => !!(value.length === rule),
  least: (value, rule) => !!(value >= rule),
  most: (value, rule) => !!(value <= rule),
  first: (value, rule) => !!(value[0] === rule),
  isIn: (value, rule) => !!(rule.includes(value)),
  numberFollowedBy: (value, rule) => {

    // Parse number part
    const number = parseInt(value)

    // We ensure one of the following key is found
    const corresponding = rule.find(({ key }) => value.includes(key))
    if (corresponding) {

      const { least, most } = corresponding
      return !!(number >= least && number <= most)

    }
    return false

  }
}

fs.readFile('puzzle', 'utf8', (err, contents) => {

  if (err) {
    console.log('ERR', err)
  }

  // Build entries & parse it
  const entries = contents.split('\n')
  const passportStrings = []
  let i = 0
  let currentPassort = ''
  while (i < entries.length) {

    // For each line, if this is a blank line we reset the currentPassort
    // if not, we simply append it
    if (!entries[i]) {
      if (currentPassort) {
        passportStrings.push(currentPassort)
      }
      currentPassort = ''
    } else {
      currentPassort = `${currentPassort} ${entries[i]}`
    }
    i++

  }

  // Then reduce each string in a human readable object
  const searchedKeys = Object.keys(keys)
  const validKeys = [...searchedKeys]
  validKeys.pop()
  const passports = []
  const validPassports = []
  passportStrings.reduce((acc, str) => {

    // Trim the string & split by spaces
    const split = (str.trim()).split(' ')

    // Assign all found keys
    const passport = {}
    split.forEach((data) => {

      const [key, value] = data.split(':')
      if (key && searchedKeys.includes(key))  {

        passport[key] = value

      }

    })

    // Create a key isValid && append array of valid passowrd if its oks
    if (validKeys.every((key) => Object.keys(passport).includes(key))) {

      // We validate each keys
      const passortKeys = Object.keys(passport)
      let isValid = true
      let i = 0
      while (passortKeys[i]) {

        // Get passport data value
        const key = passortKeys[i]
        const value = passport[key]
        // console.log('FOR KEY - ', key, ' / ', value)

        // Get corresponding rules & validators & run validations
        const rules = keys[key]

        Object.keys(rules).forEach((key) => {

          const fn = validators[key]
          const rule = rules[key]
          // console.log(fn, rule, '====', fn(value, rule))
          if (!fn(value, rule)) {

            isValid = false

          }

        })
        i++

      }

      if (isValid) {

        passport.isValid = true
        validPassports.push(passport)

      }

    }

    // Push passport
    acc.push(passport)

    // Return acc
    return acc

  }, passports)
  console.log(passports.length)
  console.log(validPassports.length)

})
