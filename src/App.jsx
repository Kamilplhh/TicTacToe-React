import { useState } from 'react';
import './index.css'

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [hide, setHide] = useState(true);
  const [move, setMove] = useState(0);

  function ChangePlayer() {
    setXIsNext(!xIsNext);
  }

  function RestartGame() {
    setSquares(Array(9).fill(null))
    setXIsNext(!xIsNext);
    setHide(true);
    setMove(0);
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O"
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
    setMove(move +1);
    setHide(false);
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (move === 9) {
    status = "Draw";
  }
  else {
    status = "Move: " + (move) + "\n Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="board">
        <div className="row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
      <div className="status">{status}</div>
      {hide &&
        <button className="button" onClick={() => ChangePlayer()}>ChangePlayer</button>
      }
      {!hide &&
        <button className="button" onClick={() => RestartGame()}>Restart Game</button>
      }
    </>
  );
}
