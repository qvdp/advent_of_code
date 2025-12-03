//! # Day 2: Gift Shop

pub fn parse(input: &str) -> Vec<(i64, i64)> {
  input
    .split(',')
    .map(|range| range.trim())
    .filter(|range| !range.is_empty())
    .filter_map(|range| range.split_once('-'))
    .map(|(a, b)| {
      (
        a.parse::<i64>().expect("E_INVALID"), 
        b.parse::<i64>().expect("E_INVALID")
      )
    })
    .collect()
}

pub fn part1(input: &[(i64, i64)]) -> i64 {
  let mut count = 0;

  for &(start, end) in input {
    
    for n in start..=end {

      let s = n.to_string();
      let len = s.len();

      if len % 2 == 0 {
        let mid = len / 2;

        let left = &s[..mid];
        let right = &s[mid..];

        if left == right {
          count += n;
        }
      }
    }
  }
  count
}

pub fn part2(input: &[(i64, i64)]) -> i64 {
  let mut count = 0;

  for &(start, end) in input {
    
    for n in start..=end {
      
      let s = n.to_string();
      let len = s.len();

      for pos in 1..=len / 2 {
        if len % pos != 0 {
          continue;
        }

        let pattern = &s[..pos];
        let repetitions = len / pos;
        if pattern.repeat(repetitions) == s {
          count += n;
          break;
        }
      }
    }
  }
  count
}

#[cfg(test)]
mod tests {
  use super::*;

  const EXAMPLE: &str = "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124";

  #[test]
  fn part1_test() {
    let input = parse(EXAMPLE);
    assert_eq!(part1(&input), 1227775554);
  }

  #[test]
  fn part2_test() {
    let input = parse(EXAMPLE);
    assert_eq!(part2(&input), 4174379265);
  }
}
