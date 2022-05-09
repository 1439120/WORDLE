import './../css/Board.css'


function Board(){

    let rows = initializeBoard(5,6)

    return(
        <div className="Board">
               {rows.map((item) => {
                   return (
                       <span className = "Tile">{item}</span>
                   )
               })}
        </div>
    )
}

function initializeBoard(len, height){
    let a = []
    for(let i = 0; i < len*height; i++){
        a.push("P")
    }
    return a;
}


export default Board