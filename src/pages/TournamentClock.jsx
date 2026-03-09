import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { findTournament } from "../data/tournaments.js";
import logo from "/logo.png";
import "./TournamentClock.css";

function parseDuration(str) {
  const match = str.match(/(\d+)/);
  return match ? parseInt(match[1], 10) * 60 : 0;
}

function formatTime(totalSeconds) {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function TournamentClock() {
  const { id } = useParams();
  const tournament = findTournament(Number(id));

  const playableLevels = tournament?.levels || [];
  const [levelIndex, setLevelIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(() =>
    playableLevels.length > 0 ? parseDuration(playableLevels[0].duration) : 0
  );
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const currentLevel = playableLevels[levelIndex] || null;
  const nextLevel = playableLevels[levelIndex + 1] || null;
  const totalDuration = currentLevel ? parseDuration(currentLevel.duration) : 0;
  const progress = totalDuration > 0 ? ((totalDuration - timeLeft) / totalDuration) * 100 : 0;
  const isWarning = timeLeft <= 60 && timeLeft > 0;

  const advanceLevel = useCallback(() => {
    if (levelIndex < playableLevels.length - 1) {
      const next = levelIndex + 1;
      setLevelIndex(next);
      setTimeLeft(parseDuration(playableLevels[next].duration));
    } else {
      setRunning(false);
    }
  }, [levelIndex, playableLevels]);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            advanceLevel();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, advanceLevel]);

  function handlePrevLevel() {
    if (levelIndex > 0) {
      const prev = levelIndex - 1;
      setLevelIndex(prev);
      setTimeLeft(parseDuration(playableLevels[prev].duration));
    }
  }

  function handleNextLevel() {
    advanceLevel();
  }

  function handleReset() {
    setRunning(false);
    setTimeLeft(totalDuration);
  }

  if (!tournament) {
    return (
      <div className="tv-clock">
        <h1>Tournament Not Found</h1>
        <Link to="/tournaments" className="back-link">Back to Schedule</Link>
      </div>
    );
  }

  return (
    <div className="tv-clock">
      {/* Top bar: logo + tournament name */}
      <div className="tv-header">
        <div className="tv-header-logo">
          <img src={logo} alt="Empire Poker" />
        </div>
        <div className="tv-header-info">
          <div className="tv-tournament-name">{tournament.name}</div>
          {tournament.subtitle && <div className="tv-tournament-sub">{tournament.subtitle}</div>}
        </div>
        <Link to={`/tournaments/${tournament.id}`} className="tv-exit">EXIT</Link>
      </div>

      {/* Main body */}
      <div className="tv-body">
        {/* Left panel: stats */}
        <div className="tv-stats">
          <div className="tv-stat-card">
            <div className="tv-stat-label">Prize Pool</div>
            <div className="tv-stat-value gold">{tournament.prize || "-"}</div>
          </div>
          <div className="tv-stat-row">
            <div className="tv-stat-card small">
              <div className="tv-stat-label">Entries</div>
              <div className="tv-stat-value">{tournament.entries}</div>
            </div>
            <div className="tv-stat-card small">
              <div className="tv-stat-label">Players</div>
              <div className="tv-stat-value">{tournament.players}</div>
            </div>
          </div>
          <div className="tv-stat-card">
            <div className="tv-stat-label">Chips in Play</div>
            <div className="tv-stat-value">{tournament.chips}</div>
          </div>
          <div className="tv-stat-card">
            <div className="tv-stat-label">Avg. Stack</div>
            <div className="tv-stat-value">{tournament.avgStack.toLocaleString()}</div>
          </div>
          {tournament.lastLonger !== null && (
            <div className="tv-stat-card">
              <div className="tv-stat-label">Last-Longer</div>
              <div className="tv-stat-value">{tournament.lastLonger}</div>
            </div>
          )}
        </div>

        {/* Center: timer + blinds */}
        <div className="tv-center">
          <div className="tv-level-badge">
            {currentLevel?.isBreak ? "Break" : `Level ${currentLevel?.level || "-"}`}
          </div>

          <div className={`tv-timer ${isWarning ? "warning" : ""}`}>
            {formatTime(timeLeft)}
          </div>

          <div className="tv-progress-bar">
            <div
              className={`tv-progress-fill ${isWarning ? "warning" : ""}`}
              style={{ width: `${progress}%` }}
            />
          </div>

          {!currentLevel?.isBreak && currentLevel ? (
            <div className="tv-current-blinds">
              <div className="tv-blinds-label">Blinds</div>
              <div className="tv-blinds-value">
                {currentLevel.sb} / {currentLevel.bb}
                {currentLevel.ante !== "-" && <span className="tv-ante"> Ante {currentLevel.ante}</span>}
              </div>
            </div>
          ) : (
            <div className="tv-current-blinds">
              <div className="tv-blinds-label">Break</div>
              <div className="tv-blinds-value break-text">Stretch your legs</div>
            </div>
          )}

          {nextLevel && (
            <div className="tv-next-blinds">
              <div className="tv-blinds-label">Next{!nextLevel.isBreak ? " Blinds" : ""}</div>
              <div className="tv-next-value">
                {nextLevel.isBreak ? "Break" : (
                  <>
                    {nextLevel.sb} / {nextLevel.bb}
                    {nextLevel.ante !== "-" && <span className="tv-ante"> Ante {nextLevel.ante}</span>}
                  </>
                )}
              </div>
            </div>
          )}

          {/* Controls - hidden on actual TV, visible for operator */}
          <div className="tv-controls">
            <button className="tv-ctrl" onClick={handlePrevLevel} disabled={levelIndex === 0}>
              Prev
            </button>
            <button
              className={`tv-ctrl tv-ctrl-play ${running ? "pause" : ""}`}
              onClick={() => setRunning((r) => !r)}
            >
              {running ? "Pause" : "Play"}
            </button>
            <button className="tv-ctrl" onClick={handleReset}>
              Reset
            </button>
            <button className="tv-ctrl" onClick={handleNextLevel} disabled={levelIndex >= playableLevels.length - 1}>
              Next
            </button>
          </div>
        </div>

        {/* Right panel: upcoming levels */}
        <div className="tv-upcoming">
          <div className="tv-upcoming-title">Upcoming Levels</div>
          {playableLevels.slice(levelIndex, levelIndex + 8).map((lvl, i) => (
            <div
              key={levelIndex + i}
              className={`tv-upcoming-row ${i === 0 ? "current" : ""} ${lvl.isBreak ? "break" : ""}`}
            >
              <span className="tv-up-level">
                {lvl.isBreak ? "Break" : `Lvl ${lvl.level}`}
              </span>
              <span className="tv-up-blinds">
                {lvl.isBreak ? "-" : `${lvl.sb} / ${lvl.bb}`}
              </span>
              <span className="tv-up-duration">{lvl.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TournamentClock;
