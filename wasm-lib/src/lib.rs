use wasm_bindgen::prelude::*;
use rand::Rng;
use js_sys::Array;

#[wasm_bindgen]
pub fn add(left: usize, right: usize) -> usize {
    left + right
}

#[wasm_bindgen]
pub fn minus(left: usize, right: usize) -> usize {
    left - right
}

struct PlayerChoice <'a>{
    choice: &'a str,
}

struct ComputerChoice <'a>{
    choice: &'a str,
}


#[wasm_bindgen]
pub fn game(input: &str) -> Array {
    let player = PlayerChoice {
        choice: input,
    };
    let computer = ComputerChoice {
        choice: ComputerChoice::computer(),
    };
    let outcome = winner(player.choice, computer.choice);
    let arr = Array::new_with_length(1);
    arr.set(0, outcome.into());
    arr.set(1, computer.choice.into());
    arr
}

impl ComputerChoice <'_>{
    fn computer() -> &'static str{
        let random_number = rand::thread_rng().gen_range(1..=3);
        match random_number {
            1 => "rock",
            2 => "paper",
            3 => "scissors",
            _ => "Error",
        }
    }
}

fn winner(player: &str, computer: &str) -> &'static str {
    if player == computer {
        "It's a tie!"
    } else if player == "rock" && computer == "paper" {
        "You've lost!"
    } else if player == "paper" && computer == "scissors" {
        "You've lost!"
    } else if player == "scissors" && computer == "rock" {
        "You've lost!"
    } else {
        "You've won!"
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = add(2, 2);
        assert_eq!(result, 4);
    }
}
