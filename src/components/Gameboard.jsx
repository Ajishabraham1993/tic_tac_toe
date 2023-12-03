export default function Gameboard({onSelect,board}) {

  return (
    <ol id="game-board">
      {board.map((rows, rowKey) => (
        <li key={rowKey}>
          <ol>
            {rows.map((PlayerSymbol, colKey) => (
              <li key={colKey}>
                <button onClick={()=>onSelect(rowKey,colKey)} disabled={(PlayerSymbol!==null)}>
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
