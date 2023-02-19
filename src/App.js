import './App.css';
import React, { useEffect, useState } from 'react';
import init, { game } from "wasm-lib";

function App() {
  const [playerScore, setplayerScore] = useState(0);
  const [compScore, setCompScore] = useState(0);
  const [context, setContext] = useState("Let's play a game of scissors!");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [disable, setDisable] = useState(false);
  const [displayReset, setDisplayReset] = useState("none");

  useEffect(() => {
    if (input !== "" && input !== "clean") {
      init().then(() => {
        setOutput(game(input));
        setInput("clean");
      })
    }
  }, [input])

  useEffect(() => {
    if (output !== "") {
      setDisable(true);
      if (output[0] === "You've won!") {
        setContext(`Computer used ${output[1]}, ${output[0]}`);
        if (playerScore < 4) {
          disableButtons();
        }
        return setplayerScore(playerScore + 1);
      } else if (output[0] === "You've lost!") {
        setContext(`Computer used ${output[1]}, ${output[0]}`);
        if (compScore < 4) {
          disableButtons();
        }
        return setCompScore(compScore + 1);
      } else {
        disableButtons();
        return setContext(`Computer used ${output[1]}, ${output[0]}`);
      }
    }
  }, [output])
  
  const disableButtons = () => {
    setTimeout(() => {
      setDisable(false);
  }, 1500)
  }

  useEffect(() => {
    if (playerScore === 5) {
      setDisable(true);
      setContext("You have won this game!");
      return setDisplayReset("block");
    } else if (compScore === 5) {
      setDisable(true);
      setContext("You have lost this game!")
      return setDisplayReset("block");
    }
  }, [playerScore, compScore])

  const resetGame = () => {
    setCompScore(0);
    setplayerScore(0);
    setDisable(false);
    setContext("Let's play a game of scissors!");
  }


  return (
    <div className="App">
      <div className='header'>
        <p style={{fontWeight: 700}}>Rock-paper-scissors made with wasm</p>
      </div>
      <div className='content'>
      <div className='title'>
        <p  style={{fontSize: "20px"}}>{context}</p>
      </div>
        <div className='content-container'>
        <div className='player'>
          <p style={{fontWeight: 700}}>Player</p>
          <p>Score: {playerScore}</p>
          <div className='player-btns'>
          <button onClick={() => {setInput("rock");}} disabled={disable}>Rock</button>
          <button onClick={() => {setInput("paper");}} disabled={disable}>Paper</button>
          <button onClick={() => {setInput("scissors");}} disabled={disable}>Scissors</button>
        </div>
        </div>
        <div className='computer'>
          <p  style={{fontWeight: 700}}>Computer</p>
          <p>Score: {compScore}</p>
        </div>
        </div>
        <button style={{display: displayReset}} onClick={() => {setDisplayReset("none"); resetGame()}}>Reset</button>
      </div>
    </div>
  );
}

export default App;
