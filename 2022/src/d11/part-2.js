import getMonkeys from './common'

const ADDITION = 'add'
const MULTIPLICATION = 'multiply'

const parseValue = (value, old) => value === 'old' ? old : parseInt(value)

const updateMonkeyItems = (monkeysList, toMonkey, item) => {
  const monkeyToUpdate = monkeysList.find(({ id }) => id === toMonkey)
  monkeyToUpdate.items.push(item)
}

export default async (puzzle) => new Promise((resolve) => {

  // Get monkeys
  const monkeys = getMonkeys(puzzle)
  
  // Start the loop
  const modulo = monkeys.reduce((acc, b) => acc * b.test, 1);
  let round = 10000
  while (round) {

    monkeys.forEach((monkey) => {

      const {
        items,
        operation,
        test,
        truthy,
        falsy
      } = monkey

      // Inspects each monkey items
      items.forEach((item) => {

        let worry = item

        // Operate test
        const { first, type, second } = operation
        switch (type) {
          case ADDITION:
            worry = parseValue(first, worry) + parseValue(second, worry)
            break
          case MULTIPLICATION:
            worry = parseValue(first, worry) * parseValue(second, worry)
            break
          default:
            throw new Error('E_UNHANDLED_OP')
        }

        // // Update worry level (divided by 3)
        worry = worry % modulo

        // Apply test & executy item move
        updateMonkeyItems(
          monkeys,
          worry % test === 0 ? truthy : falsy,
          worry
        )
        monkey.counter += 1

      })
      monkey.items.length = 0
    })
    round--

  }
  const [first, second] = monkeys.map(({ counter }) => counter).sort((a, b) => b - a)
  return resolve(first * second)

})
