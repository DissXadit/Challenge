import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false); // 🔔 kontrol notifikasi
  const navigate = useNavigate();

  const Auth = async (e) => {
    e.preventDefault();

    // 🧩 Validasi input
    if (!email.trim() || !password.trim()) {
      setMsg("Email dan password harus diisi!");
      setErrorVisible(true);
      return;
    }

    try {
      await axios.post('http://localhost:5000/login', {
        email: email,
        password: password,
      });

      setMsg('');
      setErrorVisible(false);
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg || "Login gagal, periksa kembali email dan password Anda.");
      } else {
        setMsg("Terjadi kesalahan koneksi ke server.");
      }
      setErrorVisible(true);
    }
  };

  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4-desktop">
              <form onSubmit={Auth} className="box">
                
                {/* Notifikasi Error */}
                {errorVisible && (
                  <div className="notification is-danger is-light">
                    <button className="delete" onClick={() => setErrorVisible(false)}></button>
                    {msg}
                  </div>
                )}

                {/* Email */}
                <div className="field mt-5">
                  <label className="label">Email or Username</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="field mt-5">
                  <label className="label">Password</label>
                  <div className="field has-addons">
                    <div className="control is-expanded">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="input"
                        placeholder="*******"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="control">
                      <button
                        type="button"
                        className="button is-light"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Login Button */}
                <div className="field mt-5">
                  <button className="button is-success is-fullwidth">Login</button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
