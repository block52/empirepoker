import { useState } from "react";
import { leaderboard } from "../data/playerOfTheSeries.js";
import "./PlayerOfTheSeries.css";

function PlayerOfTheSeries() {
  const [search, setSearch] = useState("");

  const filtered = search
    ? leaderboard.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    : leaderboard;

  const top3 = leaderboard.slice(0, 3);

  return (
    <div className="pots-page">
      <h1>Player of the Series</h1>

      <div className="pots-podium">
        <div className="podium-spot second">
          <div className="podium-rank">2</div>
          <div className="podium-name">{top3[1].name}</div>
          <div className="podium-points">{top3[1].points.toLocaleString()} pts</div>
          <div className="podium-games">{top3[1].games} games</div>
        </div>
        <div className="podium-spot first">
          <div className="podium-rank">1</div>
          <div className="podium-name">{top3[0].name}</div>
          <div className="podium-points">{top3[0].points.toLocaleString()} pts</div>
          <div className="podium-games">{top3[0].games} games</div>
        </div>
        <div className="podium-spot third">
          <div className="podium-rank">3</div>
          <div className="podium-name">{top3[2].name}</div>
          <div className="podium-points">{top3[2].points.toLocaleString()} pts</div>
          <div className="podium-games">{top3[2].games} games</div>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search players..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="pots-search"
      />

      <table className="pots-table">
        <thead>
          <tr>
            <th className="col-rank">Rank</th>
            <th className="col-name">Player</th>
            <th className="col-games">Games</th>
            <th className="col-points">Points</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((player) => (
            <tr key={player.rank} className={player.rank <= 3 ? "top-three" : ""}>
              <td className="col-rank">
                <span className={`rank-badge rank-${player.rank}`}>{player.rank}</span>
              </td>
              <td className="col-name">{player.name}</td>
              <td className="col-games">{player.games}</td>
              <td className="col-points">{player.points.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {filtered.length === 0 && (
        <div className="pots-empty">No players found</div>
      )}
    </div>
  );
}

export default PlayerOfTheSeries;
