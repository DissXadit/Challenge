import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const Auth = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setMsg("Email dan password harus diisi!");
      setErrorVisible(true);
      return;
    }

    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="hero is-fullheight"
      style={{
        background: "linear-gradient(135deg, #4e73df 0%, #1cc88a 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem"
      }}
    >
      <div className="box"
        style={{
          maxWidth: "420px",
          width: "100%",
          borderRadius: "15px",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
          animation: "fadeIn 0.6s ease-in-out",
          backgroundColor: "white",
        }}
      >
        <h1 className="title has-text-centered" style={{ color: "#4e73df" }}>Welcome Back</h1>
        <p className="subtitle has-text-centered" style={{ color: "#858796" }}>
          Silakan masuk untuk melanjutkan
        </p>

        <form onSubmit={Auth}>

          {errorVisible && (
            <div className="notification is-danger is-light">
              <button className="delete" onClick={() => setErrorVisible(false)}></button>
              {msg}
            </div>
          )}

          <div className="field mt-5">
            <label className="label">Email</label>
            <div className="control has-icons-left">
              <input
                type="text"
                className="input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading} 
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
            </div>
          </div>

          <div className="field mt-5">
            <label className="label">Password</label>
            <div className="field has-addons">
              <div className="control is-expanded has-icons-left">
                <input
                  type={showPassword ? "text" : "password"}
                  className="input"
                  placeholder="*******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </div>
              <div className="control">
                <button
                  type="button"
                  className="button is-light"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
          </div>

          <div className="field mt-5">
            <button
              className={`button is-success is-fullwidth ${loading ? 'is-loading' : ''}`} 
              style={{
                borderRadius: "10px",
                background: "linear-gradient(90deg, #1cc88a, #17a673)",
                color: "white",
                fontWeight: "bold",
                transition: "transform 0.1s ease-in-out",
                opacity: loading ? 0.8 : 1
              }}
              disabled={loading}
              onMouseDown={(e) => !loading && (e.target.style.transform = "scale(0.97)")}
              onMouseUp={(e) => e.target.style.transform = "scale(1)"}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          <p className="has-text-centered mt-4" style={{ color: "#6c757d" }}>
            Belum punya akun? <a href="/register" style={{ color: "#4e73df" }}>Daftar sekarang</a>
          </p>
        </form>
      </div>


      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
