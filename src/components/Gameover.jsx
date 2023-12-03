export default  function Gameover({winner,rematch}){
    return (
        <div id="game-over">
            <h2>Game Over</h2>
            {winner && <p>{winner} has won!</p>}
            {!winner && <p>its a draw!</p>}
            <button onClick={rematch}>Rematch</button>
        </div>
    )
}