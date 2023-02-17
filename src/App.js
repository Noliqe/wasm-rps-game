import './App.css';
import React, { useEffect, useState } from 'react';
import init, { game, add } from "wasm-lib";

function App() {
  const [playerScore, setplayerScore] = useState(0);
  const [compScore, setCompScore] = useState(0);
  const [context, setContext] = useState("");

  const play = (input) => {
    // if (game(input) === "You've won!") {
    //   setplayerScore(playerScore + 1);
    //   setContext("You've won this round!");
    // } else if (game(input) === "You've lost!") {
    //   setCompScore(compScore + 1);
    //   setContext("You've lost this round!");
    // } else {
    //   setContext("It's a tie!");
    // }
    init().then(() => {
      console.log(add(2,2));
      console.log(game('rock'));
    })
  }

  return (
    <div className="App">
      <div className='header'>
        <p>Rock-paper-scissors made with wasm</p>
      </div>
      <div className='title'>
        <p>{context}</p>
      </div>
      <div className='content'>
        <div className='player'>
          <p>Player</p>
          <p>Score: {playerScore}</p>
          <div className='player-btns'>
          <button onClick={() => {play("rock")}}>Rock</button>
          <button onClick={() => {play("paper")}}>Paper</button>
          <button onClick={() => {play("scissors")}}>Scissors</button>
        </div>
        </div>
        <div className='computer'>
          <p>Computer</p>
          <p>Score: {compScore}</p>
        <div className='computer-btns'>
        </div>
        </div>
      </div>
    </div>
  );
}

export default App;
