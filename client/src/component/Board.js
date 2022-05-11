import Tile from './Tile'
import './../css/Board.css'

function Board(){
    let rows = initializeBoard(5,6)
    // sets the tile events
    Tile()
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