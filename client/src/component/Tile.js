import {useState, useEffect} from 'react';
import './../css/Board.css'

function Tile(){
    const [index, setIndex] = useState(0)
    const [word_, setWord] = useState(null)
    const [gameOver, setGameOver] = useState(false)
    const [won, setWon] = useState(false)

    // Add keyboard listener
    useEffect(() => {
        function checkRow(currentRow){
            // console.log("Do i call this function", currentRow)
            // console.log("Index", index)
            let totalCorrect = 0;
            for(let i=0; i < 5; i++){
                console.log(currentRow * 5 + i)
                if(word_[i] === document.getElementById((currentRow * 5 + i).toString()).innerHTML){
                    document.getElementById(currentRow * 5 + i).className += " Correct"
                    totalCorrect += 1;
                }else if(word_.indexOf(document.getElementById((currentRow * 5 + i).toString()).innerHTML) >= 0){
                    document.getElementById(currentRow * 5 + i).className += " Present"
                }else if(word_.indexOf(document.getElementById((currentRow * 5 + i).toString()).innerHTML) === -1){
                    document.getElementById(currentRow * 5 + i).className += " Absent"
                }
            }
            if(totalCorrect >= 5){
                setGameOver(true);
                setWon(true);
            }
        }
         function handleKeyPress(e) {
            // console.log(e)
            if(gameOver) return;
            
            const currentRow = Math.floor(index / 5);
            const currentPos = index % 5;
            
            if(index !== 0 && index % 5 === 0) checkRow(currentRow - 1);
            
            if(e.key === "Backspace") {
                if(currentPos > 0) {
                    setIndex(index - 1);
                    document.getElementById((index-1).toString()).innerHTML = "";
                }
                return;
            }
            
            if(index < 5 * 6 && e.key.match(/^[A-Za-z]$/)) {
                // Add letter
                document.getElementById(index.toString()).innerHTML = e.key.toUpperCase();
                setIndex(index + 1);
            }
        }

        window.addEventListener("keyup", handleKeyPress);
        return () => window.removeEventListener("keyup", handleKeyPress);
    }, [index, word_, gameOver]);

    useEffect(() => {
        fetch("https://random-word-api.herokuapp.com/word?length=5")
        .then(response => {
            if(response.ok){
                return response.json()
            }
            throw response
        }).then(data => {
            setWord(data[0].toUpperCase())
            console.log(`The word is.... ${data[0].toUpperCase()}`)
        }).catch(error => {
            console.log("Failed to fetch my data")
        })
    }, [])
    return {
        gameOver, 
        won
    }
}

export default Tile