import Header from './component/Header'
import Board from './component/Board'
import Dashboard from './component/Dashboard'
import {useState} from 'react';
import './App.css'

function App() {
    const [gameStats, setGameStats] = useState(null);

    // This function should be called when a game ends
    const handleGameEnd = (stats) => {
        setGameStats(stats);
    };

    return (
        <div className="App">
            <Header />
            <div className="App-layout">
                <Dashboard 
                    gameStats={gameStats}
                />
                <div className="Game-container">
                    <Board onGameEnd={handleGameEnd} />
                </div>
            </div>
        </div>
    );
}

export default App