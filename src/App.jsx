import { Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import logo from "/logo.png";
import Home from "./pages/Home.jsx";
import Tournaments from "./pages/Tournaments.jsx";
import TournamentDetail from "./pages/TournamentDetail.jsx";
import TournamentClock from "./pages/TournamentClock.jsx";
import Login from "./pages/Login.jsx";
import PlayerOfTheSeries from "./pages/PlayerOfTheSeries.jsx";

function App() {
  return (
    <div className="app">
      <nav className="sidebar">
        <div className="sidebar-logo">
          <NavLink to="/">
            <img src={logo} alt="Empire Poker" />
          </NavLink>
        </div>
        <ul className="nav-menu">
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/tournaments">Tournaments</NavLink></li>
          <li><NavLink to="/results">Results</NavLink></li>
          <li><NavLink to="/leaderboard">Empire League Leaderboard</NavLink></li>
          <li><NavLink to="/gold-card">Gold Card Leaderboard</NavLink></li>
          <li><NavLink to="/divisions">Empire Divisions</NavLink></li>
          <li><NavLink to="/tickets">Empire Tickets</NavLink></li>
          <li><NavLink to="/hendon-mob">Hendon Mob</NavLink></li>
          <li><NavLink to="/player-of-the-series">Player of the Series</NavLink></li>
          <li className="nav-spacer" />
          <li><NavLink to="/login" className="nav-login">Login</NavLink></li>
        </ul>
        <div className="sidebar-socials">
          <a href="https://www.facebook.com/people/Empire-Poker-Brisbane/61554781263450/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a href="https://www.youtube.com/@EmpirePoker" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
          <a href="https://www.twitch.tv/empirepokerqueensland" target="_blank" rel="noopener noreferrer" aria-label="Twitch">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/></svg>
          </a>
        </div>
      </nav>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/tournaments/:id" element={<TournamentDetail />} />
          <Route path="/tournaments/:id/clock" element={<TournamentClock />} />
          <Route path="/player-of-the-series" element={<PlayerOfTheSeries />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
