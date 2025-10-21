import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const Logout = async () => {
    try {
      await axios.delete('http://localhost:5000/logout');
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <nav className="navbar is-light" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            <img src="data:image/png;base64,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" width="112" height="28" />
          </a>

          <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item">
              Home
            </a>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <button onClick={Logout} className="button is-light">
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

  )
}
export default Navbar;