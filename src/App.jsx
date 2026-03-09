import "./App.css";
import logo from "/logo.png";

function App() {
  return (
    <div className="app">
      <nav className="sidebar">
        <div className="sidebar-logo">
          <a href="/">
            <img src={logo} alt="Empire Poker" />
          </a>
        </div>
        <ul className="nav-menu">
          <li><a href="/" className="active">Home</a></li>
          <li><a href="/tournaments">Tournaments</a></li>
          <li><a href="/results">Results</a></li>
          <li><a href="/leaderboard">Empire League Leaderboard</a></li>
          <li><a href="/gold-card">Gold Card Leaderboard</a></li>
          <li><a href="/divisions">Empire Divisions</a></li>
          <li><a href="/tickets">Empire Tickets</a></li>
          <li><a href="/hendon-mob">Hendon Mob</a></li>
          <li><a href="/player-of-the-series">Player of the Series</a></li>
        </ul>
      </nav>
      <main className="main-content">
        <div className="hero">
          <h1>Empire Poker</h1>
          <p>Australia&apos;s Premier Poker League</p>
        </div>
      </main>
    </div>
  );
}

export default App;
