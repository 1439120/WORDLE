import {useState, useEffect} from 'react';
import './../css/Board.css'

function Tile(){
    const [index, setIndex] = useState(0)
    const [word_, setWord] = useState(null)

    function gameStatus(e){
        //console.log(e)
        if(e.key === "Enter" ){
            // now i need to make sure a complete row is 
            // completed and enter is pressed before going to the next row
            window.addEventListener("keyup", handler)
        }
    }
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
}

export default Tile