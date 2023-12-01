import { useState } from "react";

const InitialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function Gameboard() {
  const [gameboard, setGameboard] = useState(InitialGameBoard);
  function handlePlayerClick(rowKey, colKey) {
    setGameboard((lastGameboard) => {
      let CurGameboard = [...lastGameboard.map(innerArr => [...innerArr])];
      CurGameboard[rowKey][colKey] = "X";
      return CurGameboard;
    });
  }

  return (
    <ol id="game-board">
      {gameboard.map((row, rowKey) => (
        <li key={rowKey}>
          <ol>
            {row.map((PlayerSymbol, colKey) => (
              <li key={colKey}>
                <button onClick={() => handlePlayerClick(rowKey, colKey)}>
                  {PlayerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
