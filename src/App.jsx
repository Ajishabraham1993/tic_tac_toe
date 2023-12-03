import { useState } from "react";
import Gameboard from "./components/Gameboard";
import Players from "./components/Players";
import Logs from "./components/Logs";
import { WINNING_COMBINATIONS } from "./winning_combination";
import Gameover from "./components/Gameover";

function deriveActivePlayer(GameTurn) {
  let curActiveP = "X";
  if (GameTurn.length && GameTurn[0].player == "X") {
    curActiveP = "O";
  }
  return curActiveP;
}
const PLAYERS = {
  X: "Player-1",
  O: "Player-2",
}
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveGameboard(GameTurn){
  let gameboard = [...INITIAL_GAME_BOARD.map((arr) => [...arr])];
  for (let turn of GameTurn) {
    const { square, player } = turn;
    const { row, col } = square;
    gameboard[row][col] = player;
  }
  return gameboard;
}
function deriveWinner(gameboard,GameTurn){
  let winner;   

  for (const winnercombo of WINNING_COMBINATIONS) {
    const firstsymbol = gameboard[winnercombo[0].row][winnercombo[0].column];
    const secondsymbol = gameboard[winnercombo[1].row][winnercombo[1].column];
    const thirdsymbol = gameboard[winnercombo[2].row][winnercombo[2].column];
    if (
      firstsymbol &&
      firstsymbol === secondsymbol &&
      firstsymbol === thirdsymbol
    ) {
      winner = firstsymbol;
    }
  }
  return winner;
}


function App() {
  let [GameTurn, setGameTurn] = useState([]);
  let [playername, setplayername] = useState(PLAYERS);
  let activePLayer = deriveActivePlayer(GameTurn);
 
  
  const gameboard =deriveGameboard(GameTurn);
  const winner = deriveWinner(gameboard,GameTurn);
  let isDraw;
  isDraw = !winner && GameTurn.length == 9;

  function handlePlayerClick(rowKey, clolKey) {
    setGameTurn((prevTurn) => {
      let curActiveP = deriveActivePlayer(GameTurn);
      let UpdatedTurn = [
        { square: { row: rowKey, col: clolKey }, player: curActiveP },
        ...prevTurn,
      ];
      return UpdatedTurn;
    });
  }
  function handleRematch() {
    setGameTurn([]);
  }
  function handlePlayername(symbol, name) {
    setplayername((prevName) => {
      return { ...prevName, [symbol]: name };
    });
  }
  

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Players
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePLayer == "X"}
            onChangename={handlePlayername}
          />
          <Players
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePLayer == "O"}
            onChangename={handlePlayername}
          />
        </ol>
        {(winner || isDraw) && (
          <Gameover rematch={handleRematch} winner={playername[winner]} />
        )}
        <Gameboard onSelect={handlePlayerClick} board={gameboard} />
      </div>
      <Logs turns={GameTurn} />
    </main>
  );
}

export default App;
