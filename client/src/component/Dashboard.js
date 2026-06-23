// Dashboard.jsx
import { useState, useEffect } from 'react';
import './../css/Dashboard.css';

function Dashboard({ gameStats, currentStreak, bestStreak, totalGames }) {
    const [stats, setStats] = useState({
        gamesPlayed: 0,
        winRate: 0,
        currentStreak: 0,
        bestStreak: 0,
        guessDistribution: [0, 0, 0, 0, 0, 0],
        lastGame: null
    });

    // Load stats from localStorage on mount
    useEffect(() => {
        const savedStats = localStorage.getItem('wordleStats');
        if (savedStats) {
            setStats(JSON.parse(savedStats));
        }
    }, []);

    // Update stats when game ends
    useEffect(() => {
        if (gameStats) {
            updateStats(gameStats);
        }
    }, [gameStats]);

    const updateStats = (newGameStats) => {
        const updatedStats = { ...stats };
        
        // Update games played
        updatedStats.gamesPlayed += 1;
        
        // Update win/loss
        if (newGameStats.won) {
            updatedStats.currentStreak += 1;
            updatedStats.bestStreak = Math.max(updatedStats.bestStreak, updatedStats.currentStreak);
            updatedStats.guessDistribution[newGameStats.guesses - 1] += 1;
        } else {
            updatedStats.currentStreak = 0;
        }
        
        // Update win rate
        const wins = updatedStats.guessDistribution.reduce((a, b) => a + b, 0);
        updatedStats.winRate = Math.round((wins / updatedStats.gamesPlayed) * 100);
        
        updatedStats.lastGame = new Date().toLocaleDateString();
        
        setStats(updatedStats);
        localStorage.setItem('wordleStats', JSON.stringify(updatedStats));
    };

    return (
        <div className="Dashboard">
            <div className="Dashboard-header">
                <h2>📊 Statistics</h2>
                <button className="Reset-stats" onClick={() => {
                    if (window.confirm('Reset all statistics?')) {
                        const resetStats = {
                            gamesPlayed: 0,
                            winRate: 0,
                            currentStreak: 0,
                            bestStreak: 0,
                            guessDistribution: [0, 0, 0, 0, 0, 0],
                            lastGame: null
                        };
                        setStats(resetStats);
                        localStorage.setItem('wordleStats', JSON.stringify(resetStats));
                    }
                }}>
                    ↻ Reset
                </button>
            </div>

            <div className="Stats-grid">
                <div className="Stat-item">
                    <div className="Stat-value">{stats.gamesPlayed}</div>
                    <div className="Stat-label">Played</div>
                </div>
                <div className="Stat-item">
                    <div className="Stat-value">{stats.winRate}%</div>
                    <div className="Stat-label">Win Rate</div>
                </div>
                <div className="Stat-item">
                    <div className="Stat-value">{stats.currentStreak}</div>
                    <div className="Stat-label">Current Streak</div>
                </div>
                <div className="Stat-item">
                    <div className="Stat-value">{stats.bestStreak}</div>
                    <div className="Stat-label">Best Streak</div>
                </div>
            </div>

            <div className="Guess-distribution">
                <h3>Guess Distribution</h3>
                <div className="Distribution-bars">
                    {stats.guessDistribution.map((count, index) => {
                        const maxCount = Math.max(...stats.guessDistribution, 1);
                        const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
                        return (
                            <div key={index} className="Distribution-row">
                                <span className="Guess-number">{index + 1}</span>
                                <div className="Bar-container">
                                    <div 
                                        className="Bar" 
                                        style={{ 
                                            width: `${percentage}%`,
                                            backgroundColor: count > 0 ? '#538d4e' : '#3a3a4a'
                                        }}
                                    >
                                        {count > 0 && <span className="Bar-count">{count}</span>}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="Recent-game">
                <div className="Recent-label">Last Game</div>
                <div className="Recent-value">{stats.lastGame || 'No games yet'}</div>
            </div>
        </div>
    );
}

export default Dashboard;