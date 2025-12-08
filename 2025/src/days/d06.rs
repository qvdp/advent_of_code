//! # Day 6: Trash Compactor
use crate::util::parse::ParseOps;

pub fn parse(input: &str) -> &str {
    input
}

pub fn part1(input: &str) -> i64 {
    let lines = input.lines().peekable();
    
    let numbers: Vec<Vec<i64>> = lines
        .clone()
        .take_while(|line| !line.contains('+') && !line.contains('*'))
        .map(|line| line.iter_signed().collect())
        .filter(|vec: &Vec<i64>| !vec.is_empty())
        .collect();
    
    let operations: Vec<&str> = input
        .lines()
        .last()
        .unwrap()
        .split_whitespace()
        .collect();
    
    operations.iter()
        .enumerate()
        .map(|(col, &op)| {
            let initial = if op == "*" { 1 } else { 0 };
            numbers.iter()
                .map(|row| row[col])
                .fold(initial, |acc, num| match op {
                    "+" => acc + num,
                    "*" => acc * num,
                    _ => acc,
                })
        })
        .sum()
}

pub fn part2(input: &str) -> i64 {
    let mut lines: Vec<&str> = input.lines().collect();
    let ops: Vec<char> = lines.pop().unwrap().chars().collect();
    
    let mut results = 0;
    let mut i = 0;

    while i < ops.len() {
        if let '+' | '*' = ops[i] {
            let op = ops[i];
            let start = i;
            let mut problem = if op == '*' { 1 } else { 0 };
            
            while i < ops.len() && (i == start || !matches!(ops[i], '+' | '*')) {
                let column: String = lines
                    .iter()
                    .filter_map(|row| row.chars().nth(i))
                    .collect();

                match column.trim().parse::<i64>() {
                    Ok(num) => {
                        problem = if op == '+' { problem + num } else { problem * num };
                        i += 1;
                    }
                    Err(_) => break,
                }
            }
            
            results += problem;
        }
        i += 1;
    }

    results
}

#[cfg(test)]
mod tests {
    use super::*;

    const EXAMPLE: &str = "123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  ";

    #[test]
    fn part1_test() {
        let input = parse(EXAMPLE);
        assert_eq!(part1(&input), 4277556);
    }

    #[test]
    fn part2_test() {
        let input = parse(EXAMPLE);
        assert_eq!(part2(&input), 3263827);
    }
}
