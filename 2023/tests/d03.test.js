import main from '../src/index.js'

describe('[d03] - solutions', () => {
  const _day = 'd03'
  test('[d03/part_1]', async () => {
    const SOLUTION = 529618
    const answer = await main(_day, 'part-1')
    if (answer !== SOLUTION) {
      throw new error('E_WRONG_ANSWER')
    }
  });

  test('[d03/part_2]', async () => {
    const SOLUTION = 77509019
    const answer = await main(_day, 'part-2')
    if (answer !== SOLUTION) {
      throw new error('E_WRONG_ANSWER')
    }
  });
})

