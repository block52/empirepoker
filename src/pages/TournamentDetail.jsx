import { useParams, Link } from "react-router-dom";
import { findTournament, BADGE_COLORS } from "../data/tournaments.js";
import "./TournamentDetail.css";

function Badge({ label }) {
  const bg = BADGE_COLORS[label] || "#666";
  return <span className="badge" style={{ backgroundColor: bg }}>{label}</span>;
}

function InfoCard({ label, children, className }) {
  return (
    <div className={`info-card ${className || ""}`}>
      <div className="info-card-label">{label}</div>
      <div className="info-card-value">{children}</div>
    </div>
  );
}

function TournamentDetail() {
  const { id } = useParams();
  const tournament = findTournament(Number(id));

  if (!tournament) {
    return (
      <div className="tournament-detail">
        <h1>Tournament Not Found</h1>
        <Link to="/tournaments" className="back-link">Back to Schedule</Link>
      </div>
    );
  }

  return (
    <div className="tournament-detail">
      <Link to="/tournaments" className="back-link">Back to Schedule</Link>

      <div className="detail-header">
        <h1>{tournament.name}</h1>
        {tournament.subtitle && <p className="detail-subtitle">{tournament.subtitle}</p>}
        <div className="detail-badges">
          {tournament.types.map((t) => <Badge key={t} label={t} />)}
        </div>
      </div>

      <div className="detail-grid cols-2">
        <InfoCard label="Status">
          <strong>{tournament.status}</strong>
        </InfoCard>
        <InfoCard label="Registration">
          <span className={`reg-status ${tournament.regOpen ? "open" : "closed"}`}>
            {tournament.regOpen ? "OPEN" : "CLOSED"}
          </span>
          {tournament.regEnds !== null && (
            <span className="reg-detail"> (till level {tournament.regEnds})</span>
          )}
        </InfoCard>
      </div>

      <div className="detail-grid cols-1">
        <InfoCard label="Start">
          <strong>{tournament.date}, {tournament.time}</strong>
        </InfoCard>
      </div>

      <div className="detail-grid cols-3">
        <InfoCard label="Game">
          <strong>{tournament.game}</strong>
        </InfoCard>
        <InfoCard label="Buy-In & Fee">
          <strong>{tournament.buyIn}</strong>
        </InfoCard>
        <InfoCard label="Start Chips">
          <strong>{tournament.chips}</strong>
        </InfoCard>
      </div>

      <div className="detail-grid cols-3">
        <InfoCard label="Entries">
          <strong>{tournament.entries} / {tournament.players}</strong>
        </InfoCard>
        {tournament.prize ? (
          <InfoCard label="Prize Pool" className="prize">
            <strong>{tournament.prize}</strong>
          </InfoCard>
        ) : (
          <InfoCard label="Prize Pool">
            <strong>-</strong>
          </InfoCard>
        )}
        {tournament.lastLonger !== null ? (
          <InfoCard label="Last-Longer">
            <strong>{tournament.lastLonger}</strong>
          </InfoCard>
        ) : (
          <InfoCard label="Avg. Stack">
            <strong>{tournament.avgStack.toLocaleString()}</strong>
          </InfoCard>
        )}
      </div>

      <div className="detail-grid cols-3">
        <InfoCard label="Entire Stack">
          <strong>{tournament.entireStack.toLocaleString()}</strong>
        </InfoCard>
        <InfoCard label="1st Level">
          <strong>{tournament.levels[0]?.sb} / {tournament.levels[0]?.bb}</strong>
        </InfoCard>
        <InfoCard label="Avg. Stack">
          <strong>{tournament.avgStack.toLocaleString()}</strong>
        </InfoCard>
      </div>

      <button className="signup-btn">Sign Up</button>

      <div className="levels-section" id="levels">
        <h2>Blind Structure</h2>
        <table className="levels-table">
          <thead>
            <tr>
              <th>Level</th>
              <th>Small Blind</th>
              <th>Big Blind</th>
              <th>Ante</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {tournament.levels.map((lvl, i) => (
              <tr key={i} className={lvl.isBreak ? "break-row" : ""}>
                <td>{lvl.isBreak ? "Break" : lvl.level}</td>
                <td>{lvl.sb}</td>
                <td>{lvl.bb}</td>
                <td>{lvl.ante}</td>
                <td>{lvl.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TournamentDetail;
