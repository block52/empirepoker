import { useNavigate } from "react-router-dom";
import { schedule, BADGE_COLORS } from "../data/tournaments.js";
import "./Tournaments.css";

function Badge({ label }) {
  const bg = BADGE_COLORS[label] || "#666";
  return <span className="badge" style={{ backgroundColor: bg }}>{label}</span>;
}

function Tournaments() {
  const navigate = useNavigate();

  return (
    <div className="tournaments">
      <h1>Schedule</h1>
      <div className="tournament-list">
        {schedule.map((day) => (
          <div key={day.date} className="tournament-day">
            <h2 className="day-header">{day.date}</h2>
            <div className="day-events">
              {day.events.map((event) => (
                <div
                  key={event.id}
                  className="event-row"
                  onClick={() => navigate(`/tournaments/${event.id}`)}
                >
                  <div className="event-time">{event.time}</div>
                  <div className="event-details">
                    <div className="event-name">{event.name}</div>
                    <div className="event-badges">
                      {event.types.map((t) => <Badge key={t} label={t} />)}
                    </div>
                  </div>
                  <div className="event-meta">
                    <div className="meta-item">
                      <span className="meta-label">Buy-In</span>
                      <span className="meta-value">{event.buyIn}</span>
                    </div>
                    {event.prize && (
                      <div className="meta-item">
                        <span className="meta-label">Prize</span>
                        <span className="meta-value prize">{event.prize}</span>
                      </div>
                    )}
                    <div className="meta-item">
                      <span className="meta-label">Chips</span>
                      <span className="meta-value">{event.chips}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Entries</span>
                      <span className="meta-value">{event.entries}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Players</span>
                      <span className="meta-value">{event.players}</span>
                    </div>
                    {event.regEnds !== null && (
                      <div className="meta-item">
                        <span className="meta-label">Reg Ends</span>
                        <span className="meta-value">Lvl {event.regEnds}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tournaments;
