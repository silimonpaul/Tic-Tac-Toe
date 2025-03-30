import { useState } from 'react'
import './App.css'

function Square({ value, onSquareClick, isWinner, winningLine }) {
  return (
    <button className={`square ${isWinner ? 'winner' : ''}`} onClick={onSquareClick}>
      {value}
      {isWinner && <div className={`winning-line ${winningLine}`}></div>}
    </button>
  );
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares).winner) return;
    
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  const { winner, line } = calculateWinner(squares);
  const status = winner 
    ? `Winner: ${winner}`
    : squares.every(square => square)
    ? "Game is a draw!"
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <>
      <div className="status">{status}</div>
      <div className="board">
        {[0, 1, 2].map(row => (
          <div key={row} className="board-row">
            {[0, 1, 2].map(col => {
              const index = row * 3 + col;
              const isWinner = line?.includes(index);
              let winningLine = '';
              if (isWinner && line) {
                if (line[0] % 3 === line[1] % 3) winningLine = 'vertical';
                else if (Math.floor(line[0] / 3) === Math.floor(line[1] / 3)) winningLine = 'horizontal';
                else if (JSON.stringify(line) === JSON.stringify([0, 4, 8])) winningLine = 'diagonal-1';
                else if (JSON.stringify(line) === JSON.stringify([2, 4, 6])) winningLine = 'diagonal-2';
              }
              return (
                <Square
                  key={index}
                  value={squares[index]}
                  onSquareClick={() => handleClick(index)}
                  isWinner={isWinner}
                  winningLine={winningLine}
                />
              );
            })}
          </div>
        ))}
      </div>
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </>
  );
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
    [2, 4, 6],
  ];

  for (const line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: line };
    }
  }
  return { winner: null, line: null };
}

function App() {
  return (
    <div className="game">
      <Board />
    </div>
  );
}

export default App