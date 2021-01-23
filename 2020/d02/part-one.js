const fs = require('fs')

fs.readFile('puzzle', 'utf8', (err, contents) => {
  if (err) {
    console.log('ERR', err)
  }
  // Build entries
  const entries = []
  contents.split('\n').reduce((acc = [], val) => {
    const [policy, letter = '', password] = val.split(' ')
    if(policy && letter && password) {
      const [min, max] = policy.split('-')
      acc.push({
        min,
        max,
        letter: letter.substring(0, letter.length - 1),
        password
      })
    }
    return acc
  }, entries)

  // Verify each passwords
  const validPasswords = []
  entries.reduce((acc, { min, max, letter, password }) => {
    const iterations = (password.split(letter) || []).length - 1
    if (iterations >= min && iterations <= max) {
      acc.push(password)
    }
    return acc
  },validPasswords)
  console.log('Answer is', validPasswords.length)
})
