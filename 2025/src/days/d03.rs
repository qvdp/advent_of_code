//! # Day 3: Lobby
use std::char::from_digit;

pub fn parse(input: &str) -> Vec<&str> {
  input
    .split('\n')
    .map(|bank| bank.trim())
    .filter(|bank| !bank.is_empty())
    .collect()
}

pub fn part1(banks: &[&str]) -> i32 {
  let mut count: i32 = 0;
  for bank in banks {
    let mut max: i32 = 0;

    for (i, left) in bank.char_indices() {
      for right in bank.chars().skip(i + 1) {
        let s: i32 = [left, right]
          .into_iter()
          .collect::<String>()
          .parse()
          .unwrap();
        if s > max {
          max = s;
        }
      }
    }
    count += max;
  }  
  
  count
}

pub fn part2(banks: &[&str]) -> i64 {
  let mut results: i64 = 0;  

  for bank in banks {
    let mut pos: usize = 0;
    let mut largest = String::new();

    for i in 0..12 {
      let mut max: u32 = 0;
      
      let limit = bank.len() - pos - (12 - i) + 1; 
      
      let sub_string: String = bank.chars()
        .skip(pos)
        .take(limit)
        .collect();

      let mut found_relative_index: usize = 0;
      for (j, left) in sub_string.char_indices() {
        if let Some(n) = left.to_digit(10) {
          if n > max {
            found_relative_index = j;
            max = n;
          }
        }
      }

      pos = pos + found_relative_index + 1;
      largest.push(from_digit(max, 10).unwrap());
    }
    results += largest.parse::<i64>().unwrap();
  }

  results
}


#[cfg(test)]
mod tests {
  use super::*;

  const EXAMPLE: &str = "\
987654321111111
811111111111119
234234234234278
818181911112111";

  #[test]
  fn part1_test() {
    let input = parse(EXAMPLE);
    assert_eq!(part1(&input), 357);
  }

  #[test]
  fn part2_test() {
    let input = parse(EXAMPLE);
    assert_eq!(part2(&input), 3121910778619);
  }
}
