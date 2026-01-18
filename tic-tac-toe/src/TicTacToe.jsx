import React, { useState } from 'react';
import './TicTacToe.css';

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const winCombos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  function checkWinner(newBoard) {
    for (let combo of winCombos) {
      const [a, b, c] = combo;

      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        return newBoard[a];
      }
    }
    return null;
  }

  function handleClick(index) {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';

    const win = checkWinner(newBoard);

    setBoard(newBoard);

    if (win) {
      setWinner(win);
    } else {
      setIsXNext(!isXNext);
    }
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  }

  return (
    <div className="game">
      <h1>
        {winner
          ? `Player ${winner} Wins 🎉`
          : `Next Turn : Player ${isXNext ? 'X' : 'O'}`
        }
      </h1>

      <div className="container">
        {board.map((val, idx) => (
          <div
            key={idx}
            className="box"
            onClick={() => handleClick(idx)}
          >
            {val}
          </div>
        ))}
      </div>

      <button className="reset-btn" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
}

export default TicTacToe;
