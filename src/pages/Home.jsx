import { Link } from "react-router-dom";
import { schedule } from "../data/tournaments.js";
import { leaderboard } from "../data/playerOfTheSeries.js";
import logo from "/logo.png";
import "./Home.css";

function Home() {
  const upcomingEvents = schedule.flatMap((day) =>
    day.events.map((e) => ({ ...e, date: day.date }))
  ).slice(0, 4);

  const topPlayers = leaderboard.slice(0, 5);

  return (
    <div className="home">
      <div className="home-hero">
        <img src={logo} alt="Empire Poker" className="home-logo" />
        <h1>Empire Poker</h1>
        <p>Australia&apos;s Premier Poker League</p>
        <div className="home-hero-actions">
          <Link to="/tournaments" className="home-btn primary">View Tournaments</Link>
          <Link to="/login" className="home-btn secondary">Register Now</Link>
        </div>
      </div>

      <div className="home-stats">
        <div className="home-stat">
          <div className="home-stat-value">339</div>
          <div className="home-stat-label">Players</div>
        </div>
        <div className="home-stat">
          <div className="home-stat-value">11</div>
          <div className="home-stat-label">Events</div>
        </div>
        <div className="home-stat">
          <div className="home-stat-value gold">$100K+</div>
          <div className="home-stat-label">Prize Pools</div>
        </div>
      </div>

      <div className="home-sections">
        <div className="home-section">
          <div className="home-section-header">
            <h2>Upcoming Tournaments</h2>
            <Link to="/tournaments" className="home-section-link">View All</Link>
          </div>
          <div className="home-upcoming">
            {upcomingEvents.map((event) => (
              <Link
                to={`/tournaments/${event.id}`}
                key={event.id}
                className="home-event"
              >
                <div className="home-event-date">{event.date}</div>
                <div className="home-event-info">
                  <div className="home-event-name">{event.name}</div>
                  <div className="home-event-meta">{event.time} &middot; {event.buyIn}</div>
                </div>
                {event.prize && <div className="home-event-prize">{event.prize}</div>}
              </Link>
            ))}
          </div>
        </div>

        <div className="home-section">
          <div className="home-section-header">
            <h2>Leaderboard</h2>
            <Link to="/player-of-the-series" className="home-section-link">Full Standings</Link>
          </div>
          <div className="home-leaderboard">
            {topPlayers.map((player) => (
              <div key={player.rank} className="home-leader-row">
                <span className={`home-leader-rank rank-${player.rank}`}>{player.rank}</span>
                <span className="home-leader-name">{player.name}</span>
                <span className="home-leader-points">{player.points.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
