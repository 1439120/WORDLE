import './../css/Board.css'
import React, {useState, useEffect} from 'react';


function Board(){

    let rows = initializeBoard(5,6)
    const [index, setIndex] = useState(0)

    function handler(e){
        if(index < 5 * 6 && (e.code >= "KeyA" && e.code <= "KeyZ")){
            setIndex(index + 1)
            document.getElementById(index.toString()).innerHTML = e.code[3]
        }
        
    }

    useEffect((e) => {
        window.addEventListener("keyup", handler)

        return () => {
            window.removeEventListener("keyup", handler)
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