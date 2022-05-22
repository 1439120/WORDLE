import {useState, useEffect, useRef} from 'react';
import './../css/Board.css'

function Tile(){
    const [index, setIndex] = useState(0)
    const [word_, setWord] = useState(null)
    const [gameOver, setGameOver] = useState(0)
    const [isGameOver, setIsGameOver] = useState(false)
    // function gameStatus(e){
    //     //console.log(e)
    //     if(e.key === "Enter" ){
    //         // now i need to make sure a complete row is 
    //         // completed and enter is pressed before going to the next row
    //         window.addEventListener("keyup", handler)
    //         if(gameOver === 5){
    //             setIsGameOver(true)
    //             // clear board
    //             for(let i = 0; i < 5*6; i++){
    //                 document.getElementById(i.toString()).innerHTML = ""
    //                 document.getElementById(index.toString()).id = ""
    //             }
    //         }
    //         setGameOver(0)
    //     }
    // }
    // function handler(e){
    //     if(index < 5 * 6 && (e.code >= "KeyA" && e.code <= "KeyZ")){
    //         setIndex(index + 1)
    //         document.getElementById(index.toString()).innerHTML = e.code[3]

    //         // Check if the alphabet is correct
    //         if(word_[index % 5] === e.code[3]){
    //             document.getElementById(index.toString()).id = "Correct"
    //             setGameOver(gameOver + 1)
    //         }else if(word_.indexOf(e.code[3]) >= 0){
    //             document.getElementById(index.toString()).id = "Present"
    //         }else if(word_.indexOf(e.code[3]) === -1){
    //             document.getElementById(index.toString()).id = "Absent"
    //         }
    //     }
    // }
    // useEffect(() => {
    //     if(index%5 !== 0 || index === 0){
    //         window.addEventListener("keyup", handler)
    //     }else{
    //         window.addEventListener("keyup", gameStatus)
    //     }
    //     return () => {
    //         window.removeEventListener("keyup", handler)
    //         window.removeEventListener("keyup", gameStatus)
    //     }
    // })

    // useEffect(() => {
    //     fetch("https://random-word-api.herokuapp.com/word?length=5")
    //     .then(response => {
    //         if(response.ok){
    //             return response.json()
    //         }
    //         throw response
    //     }).then(data => {
    //         setWord(data[0].toUpperCase())
    //         setIsGameOver(false)
    //         console.log(`The word is.... ${data[0].toUpperCase()}`)
    //     }).catch(error => {
    //         console.log("Failed to fetch my data")
    //     })
    // }, [isGameOver])
    const [letter, setLetter] = useState("")
    const [added, setAdded] = useState(false)
    let rows = initializeBoard(5,6)
    function handler(e) {
        console.log(e.code)
        setLetter(e.code)
    }
    useEffect(()=>{
        window.addEventListener("keyup", handler)
        return () => {
            window.removeEventListener("keyup", handler) 
        }
    })

    function UpdateLetter(){
        //console.log(tileRef.current)
        if(!added){
            setAdded(true)
            return letter
        }
    }
    return(
        <>
            {rows.map((item, i) => {
                   return (
                       <span className = "Tile" id={i} key = {i}>{UpdateLetter()}</span>
                   )
            })}
        </>
    )
}

function initializeBoard(len, height){
    let a = []
    for(let i = 0; i < len*height; i++){
        a.push("")
    }
    return a;
}


export default Tile