import './../css/Board.css'
import React, {useState, useEffect} from 'react';


function Board(){
    // 
    let word_ = "QUEEN"
    let rows = initializeBoard(5,6)
    const [index, setIndex] = useState(0)
    //const [gameOver, setGameOver] = useState(false)

    function handler(e){
        if(index < 5 * 6 && (e.code >= "KeyA" && e.code <= "KeyZ")){
            setIndex(index + 1)
            document.getElementById(index.toString()).innerHTML = e.code[3]

            // Check if the alphabet is correct
            if(word_[index % 5] === e.code[3]){
                document.getElementById(index.toString()).id = "Correct"
            }else if(word_.indexOf(e.code[3]) >= 0){
                document.getElementById(index.toString()).id = "Present"
            }else if(word_.indexOf(e.code[3]) === -1){
                document.getElementById(index.toString()).id = "Absent"
            }
        }
    }

    function gameStatus(e){
        console.log(e)
        if(e.key === "Enter" ){
            // now i need to make sure a complete row is 
            // completed and enter is pressed before going to the next row
            window.addEventListener("keyup", handler)
        }
    }

    useEffect(() => {
        if(index%5 !== 0 || index === 0){
            window.addEventListener("keyup", handler)
        }else{
            window.addEventListener("keyup", gameStatus)
        }
        return () => {
            window.removeEventListener("keyup", handler)
            window.removeEventListener("keyup", gameStatus)
        }
    })

    return(
        <div className="Board">
               {rows.map((item, i) => {
                   return (
                       <span className = "Tile" id={i}>{item}</span>
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