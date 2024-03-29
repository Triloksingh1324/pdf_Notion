import React, { useState } from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';

function Navbar(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const closeDropdown = () => {
    setShowDropdown(false);
  };
  return (
    
    <header className="navbar">
      <div className="container">
        <div className={`menu-nav ${props.mode}`}>
          <div className="logo">
            <h1 className="logo-name">Pdf-Notion</h1>
          </div>
          <div className={`nav-list ${showDropdown ? 'show-dropdown' : ''}-${props.mode}`}>
            <nav className={`nav${showDropdown ? 'show-dropdown' : 'no'}`}>
              <ul className={`list-items-${props.mode}`}>
              <Link to="/" onClick={closeDropdown}><li>HOME</li></Link>
                <Link to="/jpgtopdf" onClick={closeDropdown}><li>Jpg to pdf</li></Link>
                <Link to="/merge" onClick={closeDropdown}><li>Merge</li></Link>
                <Link to="/split" onClick={closeDropdown}><li>Split</li></Link>
                <Link to="/removepage" onClick={closeDropdown}><li>Remove Page</li></Link>
              </ul>
            </nav>
          </div>
          <div className="toggle-dark-mode" onClick={props.toggleMode}>
            {props.mode === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-moon-fill moon" viewBox="0 0 16 16">
                <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-brightness-high sun" viewBox="0 0 16 16">
                <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
              </svg>
            )}
          </div>
          <div className="hamburger" onClick={toggleDropdown}>
            <div className={`line-${props.mode}`}></div>
            <div className={`line-${props.mode}`}></div>
            <div className={`line-${props.mode}`}></div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
