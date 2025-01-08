import './Navbar.css';
import { Link } from "react-router-dom";
import logo from '../../assets/logo.png';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showUsername, setShowUsername] = useState(false);
  const [username, setUsername] = useState(null);

  // Retrieve username from sessionStorage when the component mounts
  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername); // Set username if available in sessionStorage
    }
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleUsername = () => {
    setShowUsername(!showUsername);
  };

  return (
    <nav className="navbar">
      <img src={logo} alt="Logo" className="nav-logo" />

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/registration">Registration</Link>

        <div className="navbar-dropdown">
          <Link
            to="#"
            className="dropdown-btn"
            onClick={(e) => {
              e.preventDefault(); // Prevent navigation for the "Menu" button
              toggleMenu();
            }}
          >
            Menu
          </Link>
          {menuOpen && (
            <div className="dropdown-menu">
              <Link to="/challenges">Challenges</Link>
              <Link to="/notifications">Notifications</Link>
              <Link to="/friends">Friends</Link>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/analytics">Analytics</Link>
            </div>
          )}
        </div>

        {/* User Button */}
        {username && (
          <div className="user-display">
            <button
              onClick={toggleUsername}
              className="user-button"
            >
              {username.charAt(0).toUpperCase()} {/* Display first letter of username */}
            </button>
            {showUsername && (
              <span className="username">{username}</span>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
