import main from '../src/index.js'

test('[01/part_1] should work', async () => {
  const DAY = 'd01'
  const PART_1 = 'part-1'
  await main(DAY, PART_1)
});

test('[01/part_2] should work', async () => {
  const DAY = 'd01'
  const PART_2 = 'part-2'
  await main(DAY, PART_2)
});