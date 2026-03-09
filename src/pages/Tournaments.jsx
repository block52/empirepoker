import "./Tournaments.css";

const BADGE_COLORS = {
  "Re-Entry": "#2196f3",
  "1xRe-Entry": "#2196f3",
  "2xRe-Entry": "#2196f3",
  "Last-Longer": "#00bcd4",
  "Buffet": "#0097a7",
  "Bonus": "#4caf50",
  "Add-On": "#ff9800",
  "1xAdd-On": "#ff9800",
};

const schedule = [
  {
    date: "March 9, 2026",
    events: [
      { time: "6:00 pm", name: "Mystical Monday Freezeout", buyIn: "$160 120+30+10", prize: "$3,000", types: ["Last-Longer"], chips: "50,000", entries: 0, players: 0, regEnds: 6 },
      { time: "7:45 pm", name: "Rotation Timed Tournament", buyIn: "$140", prize: "", types: ["Buffet", "Bonus", "Re-Entry", "Add-On"], chips: "10,000", entries: 0, players: 0, regEnds: 3 },
    ],
  },
  {
    date: "March 12, 2026",
    events: [
      { time: "4:00 pm", name: "Ignition Super Satellite", buyIn: "$120", prize: "$1,650", types: ["Re-Entry"], chips: "20,000", entries: 0, players: 0, regEnds: 8 },
      { time: "6:00 pm", name: "Queensland Team Championships", buyIn: "$1,200", prize: "", types: [], chips: "10,000", entries: 0, players: 0, regEnds: null },
    ],
  },
  {
    date: "March 13, 2026",
    events: [
      { time: "1:00 pm", name: "High Roller", buyIn: "$800 700+100", prize: "$20,000", types: ["Re-Entry"], chips: "100,000", entries: 0, players: 0, regEnds: 12 },
      { time: "5:00 pm", name: "The Phoenix", buyIn: "$250 210+40", prize: "$15,000", types: ["1xRe-Entry", "1xAdd-On"], chips: "60,000", entries: 0, players: 0, regEnds: 8 },
      { time: "8:00 pm", name: "2-7 Single Draw", buyIn: "$250", prize: "", types: ["Re-Entry"], chips: "30,000", entries: 0, players: 0, regEnds: 8 },
    ],
  },
  {
    date: "March 14, 2026",
    events: [
      { time: "2:00 pm", name: "Empire Champs 300", buyIn: "$300 250+50", prize: "$15,000", types: [], chips: "100,000", entries: 0, players: 0, regEnds: 8 },
      { time: "5:00 pm", name: "Spartan", buyIn: "$300 250+50", prize: "", types: ["2xRe-Entry"], chips: "40,000", entries: 0, players: 0, regEnds: 8 },
    ],
  },
  {
    date: "March 15, 2026",
    events: [
      { time: "12:00 pm", name: "The Gladiator", buyIn: "$400 340+60", prize: "$15,000", types: ["2xRe-Entry"], chips: "60,000", entries: 0, players: 0, regEnds: 10 },
      { time: "4:00 pm", name: "Drawmaha", buyIn: "$250", prize: "", types: ["Re-Entry"], chips: "30,000", entries: 0, players: 0, regEnds: 8 },
    ],
  },
];

function Badge({ label }) {
  const bg = BADGE_COLORS[label] || "#666";
  return <span className="badge" style={{ backgroundColor: bg }}>{label}</span>;
}

function Tournaments() {
  return (
    <div className="tournaments">
      <h1>Schedule</h1>
      <div className="tournament-list">
        {schedule.map((day) => (
          <div key={day.date} className="tournament-day">
            <h2 className="day-header">{day.date}</h2>
            <div className="day-events">
              {day.events.map((event, i) => (
                <div key={i} className="event-row">
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
