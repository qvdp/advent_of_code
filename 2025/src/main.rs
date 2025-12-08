use aoc::util::ansi::*;
use aoc::util::parse::*;
use std::env::args;
use std::fs::read_to_string;
use std::time::{Duration, Instant};

struct Solution {
    day: u32,
    wrapper: fn(&str) -> (String, String),
}

fn main() {
    let day: Option<u32> = args().nth(1).and_then(|arg| arg.parse().ok());

    let solutions = get_solutions();

    let (stars, duration) = solutions
        .iter()
        .filter(|s| day.is_none_or(|d| d == s.day))
        .fold((0, Duration::ZERO), run_solution);

    if args().any(|arg| arg == "--totals") {
        println!("{BOLD}{YELLOW}⭐ {stars}{RESET}");
        println!("{BOLD}{WHITE}🕓 {} ms{RESET}", duration.as_millis());
    }
}

fn run_solution((stars, duration): (u32, Duration), solution: &Solution) -> (u32, Duration) {
    let day = solution.day;
    let path = format!("inputs/d{day:02}.txt");

    if let Ok(data) = read_to_string(&path) {
        let instant = Instant::now();
        let (part1, part2) = (solution.wrapper)(&data);
        let elapsed = instant.elapsed();

        println!("{BOLD}{YELLOW}🎄 Day {day}{RESET}");
        println!("    Part 1: {part1}");
        println!("    Part 2: {part2}");

        (stars + 2, duration + elapsed)
    } else {
        eprintln!("{BOLD}{RED}Day {day}{RESET}");
        eprintln!("    Missing input!");
        eprintln!("    Place input file in {BOLD}{WHITE}{path}{RESET}");

        (stars, duration)
    }
}

macro_rules! days {
  ($($day:tt),*) => {
    fn get_solutions() -> Vec<Solution> {
      vec![$({
        Solution {
          day: stringify!($day).unsigned(),
          wrapper: |data: &str| {
            use aoc::days::$day::*;

            let input = parse(data);
            let part1 = part1(&input).to_string();
            let part2 = part2(&input).to_string();

            (part1, part2)
          }
        }
      },)*]
    }
  }
}

days!(d01, d02, d03, d04, d05, d06);
