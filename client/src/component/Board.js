// import Tile from './Tile'
import './../css/Board.css'
import {useState, useEffect} from 'react';

function Board({gameOver, handleGameEnd}){
    const [rows, setRows] = useState(() => initializeBoard(5, 6));
    
    // Reset board when gameOver changes to true
    useEffect(() => {
        console.log("Is game over", gameOver)
        if (gameOver) {
            
            // Reset the rows state
            setTimeout(() => {
                // // Clear all tiles
                for (let i = 0; i < 30; i++) {
                    const tile = document.getElementById(i.toString());
                    if (tile) {
                        tile.innerHTML = "";
                        tile.className = "Tile"; // Reset class
                    }
                }
                setRows(initializeBoard(5, 6));
                handleGameEnd()
            }, 5000);
        }
    }, [gameOver]); // 👈 Runs when gameOver changes
    return(
        <div className="Board">
               {rows.map((item, i) => {
                   return (
                       <span className = "Tile" id={i} key={i}>{item}</span>
                   )
               })}
        </div>
    )
}

function initializeBoard(len, height){
    let a = []
    for(let i = 0; i < len*height; i++){
        a.push("")
    }
    return a;
}

export default Board