import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const Logout = async () => {
    try {
      await axios.delete('http://localhost:5000/logout');
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav
      className="navbar"
      role="navigation"
      aria-label="main navigation"
      style={{
        background: "linear-gradient(90deg, #4e73df 0%, #1cc88a 100%)",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        position: "sticky",
        top: 0,
        zIndex: 10
      }}
    >
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item" href="/dashboard">
            <h1
              style={{
                fontWeight: "700",
                color: "white",
                fontSize: "1.5rem",
                letterSpacing: "0.5px"
              }}
            >
              My<span style={{ color: "#e8f9f4" }}>App</span>
            </h1>
          </a>

          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarMenu"
            onClick={() => {
              const menu = document.getElementById('navbarMenu');
              menu.classList.toggle('is-active');
            }}
          >
            <span aria-hidden="true" style={{ background: "white" }}></span>
            <span aria-hidden="true" style={{ background: "white" }}></span>
            <span aria-hidden="true" style={{ background: "white" }}></span>
          </a>
        </div>

        <div id="navbarMenu" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item has-text-white" href="/dashboard">
              Dashboard
            </a>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <button
                  onClick={Logout}
                  className="button"
                  style={{
                    background: "white",
                    color: "#4e73df",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => (e.target.style.background = "#f8f9fc")}
                  onMouseLeave={(e) => (e.target.style.background = "white")}
                >
                  <i className="fas fa-sign-out-alt" style={{ marginRight: "5px" }}></i>
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
