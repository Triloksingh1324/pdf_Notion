import React from 'react'
import './Nav.css'

function Navbar() {
  return (
    <>
      <header className="navbar">
        <div className="container">
          <div className="menu-nav">
            <div className="logo">
              <h1 className="logo-name">Pdf-Notion</h1>
            </div>
            <div className="nav-list">
              <nav className="nav">
                <ul className="list-items">
                  <li>HOME</li>
                  <li>About</li>
                  <li>Services</li>
                  <li>Contact us</li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Navbar