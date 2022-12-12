const MONKEY_SEPERATOR = 'Monkey '
const INSTRUCTION_SEPERATOR = '\n'
const OPERATIONS_SIGNS = {
  '+': 'add',
  '*': 'multiply'
}

const parseOperation = (str) => {

  const [, operation] = str.split(' = ')
  const [first, sign, second] = operation.split(' ')
  return {
    first,
    type: OPERATIONS_SIGNS[sign],
    second
  }

}

export default (puzzle) => puzzle
  .split(MONKEY_SEPERATOR)
  .filter((monkey) => !!monkey)
  .map((monkey) => {

    const [id, items, operation, test, truthy, falsy] = monkey.split(INSTRUCTION_SEPERATOR)
    return {
      id: parseInt(id),
      items: items.replace('Starting items:', '').trim().split(', ').map((item) => parseInt(item)),
      operation: parseOperation(operation.replace('Operation:', '').trim()),
      test: parseInt(test.replace('Test: divisible by', '').trim()),
      truthy: parseInt(truthy.replace('If true: throw to monkey', '').trim()),
      falsy: parseInt(falsy.replace('If false: throw to monkey', '').trim()),
      counter: 0
    }

  })
