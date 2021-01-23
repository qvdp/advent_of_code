const fs = require('fs')
const keys = {
  byr: 'BIRTH_YEAR',
  iyr: 'ISSUE_YEAR',
  eyr: 'EXPIRATION_YEAR',
  hgt: 'HEIGHT',
  hcl: 'HAIR_COLOR',
  ecl: 'EYE_COLOR',
  pid: 'PASSPORT_ID',
  cid: 'COUNTRY_ID'
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

      passport.isValid = true
      validPassports.push(passport)

    }

    // Push passport
    acc.push(passport)

    // Return acc
    return acc

  }, passports)
  console.log(passports.length)
  console.log(validPassports.length)

})
