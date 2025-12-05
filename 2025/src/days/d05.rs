//! # Day 5: Cafeteria

#[derive(Debug, Clone, Copy)]
struct Range {
    start: i64,
    end: i64,
}

impl Range {
    fn new(start: i64, end: i64) -> Self {
        Range { start, end }
    }

    fn overlap(&self, other: &Range) -> bool {
        self.start <= other.end && self.end >= other.start
    }

    fn combine(&self, other: &Range) -> Range {
        Range {
            start: self.start.min(other.start),
            end: self.end.max(other.end),
        }
    }
}

pub fn parse(input: &str) -> Result<(Vec<(i64, i64)>, Vec<i64>), &str> {
    let parts: Vec<&str> = input.split("\n\n").collect();

    if parts.len() >= 2 {
        let ranges = parts[0]
            .lines()
            .map(str::trim)
            .filter(|range| !range.is_empty())
            .filter_map(|range| range.split_once('-'))
            .map(|(a, b)| {
                (
                    a.parse::<i64>().expect("E_INVALID"),
                    b.parse::<i64>().expect("E_INVALID"),
                )
            })
            .collect();

        let products = parts[1]
            .lines()
            .map(str::trim)
            .filter(|nbr| !nbr.is_empty())
            .map(|a| a.parse::<i64>().expect("E_INVALID"))
            .collect();

        Ok((ranges, products))
    } else {
        Err("E_INVALID_PARSING")
    }
}

pub fn part1(inputs: &Result<(Vec<(i64, i64)>, Vec<i64>), &str>) -> i32 {
    let mut count: i32 = 0;

    match inputs {
        Ok((ranges, products)) => {
            for product in products {
                let is_in_range = ranges.iter().any(|&(start, end)| *product >= start && *product <= end);
                count += i32::from(is_in_range);
            }
        }
        Err(e) => println!("Erreur: {}", e),
    }

    count
}

pub fn part2(inputs: &Result<(Vec<(i64, i64)>, Vec<i64>), &str>) -> i64 {
    let mut count: i64 = 0;

    match inputs {
        Ok((ranges, _)) => {
            // Sort ranges by start; then by end
            let mut sorted_ranges = ranges.clone();
            sorted_ranges.sort_by(|a, b| a.0.cmp(&b.0).then(a.1.cmp(&b.1)));

            // Prepare a filtered vector of ranges objects
            let mut filtered_ranges: Vec<Range> = Vec::new();

            // Iterate over all ranges, and for each ranges :
            // - detect if the range overlap with one member of filtered vector of ranges
            // - if so, combine the range the detected range object 
            // - if not, push the  range object as new member
            for (a, b) in sorted_ranges {
                // Initialize range object
                let current_range = Range::new(a, b);
                let mut combined = false;

                // Find a potential range overlap
                for (i, range) in filtered_ranges.iter().enumerate() {
                    if current_range.overlap(range) {
                        let combined_range = current_range.combine(range);
                        filtered_ranges[i] = combined_range;
                        combined = true;
                        break;
                    }
                }

                if !combined {
                    filtered_ranges.push(current_range.clone());
                }
            }
            let sum: i64 = filtered_ranges.iter().map(|range| (range.end - range.start) + 1).sum();
            count += sum;

        }
        Err(e) => println!("Erreur: {}", e),
    }

    count
}

#[cfg(test)]
mod tests {
    use super::*;

    const EXAMPLE: &str = "3-5
10-14
16-20
12-18

1
5
8
11
17
32";

    #[test]
    fn part1_test() {
        let input = parse(EXAMPLE);
        assert_eq!(part1(&input), 3);
    }

    #[test]
    fn part2_test() {
        let input = parse(EXAMPLE);
        assert_eq!(part2(&input), 15);
    }
}
