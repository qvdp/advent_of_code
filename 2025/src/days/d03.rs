//! # Day 3: Lobby

pub fn parse(input: &str) -> Vec<&str> {
    input.lines().collect()
}

pub fn part1(input: &[&str]) -> u64 {
    solve(input, 2)
}

pub fn part2(input: &[&str]) -> u64 {
    solve(input, 12)
}

fn solve(banks: &[&str], n_digits: usize) -> u64 {
    let mut results: u64 = 0;

    for bank in banks {
        // '0' -> 48
        // '9' -> 57
        let bytes = bank.as_bytes();

        let mut pos = 0;
        let mut current_bank_value: u64 = 0;

        for i in 0..n_digits {
            let remaining_needed = n_digits - 1 - i;

            let search_limit = bytes.len() - remaining_needed;

            let slice = &bytes[pos..search_limit];

            let mut max_digit = 0;
            let mut relative_index = 0;

            for (idx, &digit) in slice.iter().enumerate() {
                if digit > max_digit {
                    max_digit = digit;
                    relative_index = idx;

                    if max_digit == b'9' {
                        break;
                    }
                }
            }
            current_bank_value = current_bank_value * 10 + (max_digit - b'0') as u64;
            pos += relative_index + 1;
        }
        results += current_bank_value;
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
