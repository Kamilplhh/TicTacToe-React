import { useState } from 'react';
import './index.css'

function Square({ value, SquareClick }) {
  return (
    <button className="square" onClick={SquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

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
    } else {
      status = "Next player: " + (xIsNext ? "X" : "O");
    }

    return (
      <>
        <div className="status">{status}</div>
        <div className="board">
          <div className="row">
            <Square value={squares[0]} SquareClick={() => handleClick(0)} />
            <Square value={squares[1]} SquareClick={() => handleClick(1)} />
            <Square value={squares[2]} SquareClick={() => handleClick(2)} />
          </div>
          <div className="row">
            <Square value={squares[3]} SquareClick={() => handleClick(3)} />
            <Square value={squares[4]} SquareClick={() => handleClick(4)} />
            <Square value={squares[5]} SquareClick={() => handleClick(5)} />
          </div>
          <div className="row">
            <Square value={squares[6]} SquareClick={() => handleClick(6)} />
            <Square value={squares[7]} SquareClick={() => handleClick(7)} />
            <Square value={squares[8]} SquareClick={() => handleClick(8)} />
          </div>
        </div>
      </>
    );
  }
