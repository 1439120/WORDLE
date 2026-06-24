import Header from './component/Header'
import Board from './component/Board'
import Dashboard from './component/Dashboard'
import { useWordle } from './hooks/useWordle';
import './App.css'

function App() {
    // const [gameStats, setGameStats] = useState(null);
    const { stats, gameOver, restartGame } = useWordle();
    // This function should be called when a game ends
    // const handleGameEnd = (stats) => {
    //     // setGameStats(stats);
    // };

    return (
        <div className="App">
            <Header />
            <div className="App-layout">
                <Dashboard 
                    stats={stats}
                />
                <div className="Game-container">
                    <Board gameOver={gameOver} handleGameEnd={restartGame} />
                </div>
            </div>
        </div>
    );
}

export default App