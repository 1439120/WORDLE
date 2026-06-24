import { useState, useEffect } from 'react';

export function useWordle() {
    const [index, setIndex] = useState(0);
    const [word_, setWord] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [won, setWon] = useState(false);
    const [stats, setStats] = useState({
        gamesPlayed: 0,
        winRate: 0,
        currentStreak: 0,
        bestStreak: 0,
        guessDistribution: [0, 0, 0, 0, 0, 0],
        lastGame: null
    });

    useEffect(() => {
        const saved = localStorage.getItem('wordleStats');

        if (saved) {
            setStats(JSON.parse(saved));
        }
    }, []);

    function updateStats(won, guesses) {
        setStats(prev => {
            const updated = { ...prev };
            updated.gamesPlayed += 1;
            if (won) {
                updated.currentStreak += 1;
                updated.bestStreak = Math.max(
                    updated.bestStreak,
                    updated.currentStreak
                );
                updated.guessDistribution[guesses - 1] += 1;
            } else {
                updated.currentStreak = 0;
            }
            const wins =
                updated.guessDistribution.reduce((a,b) => a + b,0);
            updated.winRate = Math.round(
                (wins / updated.gamesPlayed) * 100
            );
            updated.lastGame = new Date().toLocaleDateString();
            localStorage.setItem(
                'wordleStats',
                JSON.stringify(updated)
            );
            return updated;
        });
}

    useEffect(() => {
        function checkRow(currentRow) {
            let totalCorrect = 0;
            for(let i = 0; i < 5; i++) {
                const tileId = currentRow * 5 + i;
                const tile = document.getElementById(tileId.toString());
                if(!tile) continue;
                
                const letter = tile.innerHTML;
                if(word_[i] === letter) {
                    tile.className = "Tile Correct";
                    totalCorrect += 1;
                } else if(word_.indexOf(letter) >= 0) {
                    tile.className = "Tile Present";
                } else {
                    tile.className = "Tile Absent";
                }
            }
            if(totalCorrect >= 5) {
                setGameOver(true);
                setWon(true);
                updateStats(true, currentRow + 1);
            } else if(currentRow >= 5) {
                setGameOver(true);
                updateStats(false, 6);
            }
        }

        function handleKeyPress(e) {
            if(gameOver) return;
            
            const currentRow = Math.floor(index / 5);
            const currentPos = index % 5;
            
            if(index !== 0 && index % 5 === 0) checkRow(currentRow - 1);
            
            if(e.key === "Backspace") {
                if(currentPos > 0) {
                    setIndex(index - 1);
                    const tile = document.getElementById((index-1).toString());
                    if(tile) tile.innerHTML = "";
                }
                return;
            }
            
            if(index < 30 && e.key.match(/^[A-Za-z]$/)) {
                const tile = document.getElementById(index.toString());
                if(tile) {
                    tile.innerHTML = e.key.toUpperCase();
                    setIndex(index + 1);
                }
            }
        }

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [index, word_, gameOver]);

    useEffect(() => {
        fetch("https://random-word-api.herokuapp.com/word?length=5")
            .then(response => {
                if(response.ok) return response.json();
                throw response;
            })
            .then(data => {
                setWord(data[0].toUpperCase());
                console.log(`The word is.... ${data[0].toUpperCase()}`);
            })
            .catch(error => {
                console.log("Failed to fetch my data");
            });
    }, [gameOver]);

    function restartGame(){
        console.log("Game is restarting")
        setIndex(0);
        setGameOver(false);
        setWon(false);
    }

    return { 
        gameOver, 
        restartGame,
        stats
        };
}
