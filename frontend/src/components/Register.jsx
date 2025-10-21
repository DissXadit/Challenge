import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfPassword, setShowConfPassword] = useState(false);
    const [msg, setMsg] = useState('');
    const [errorVisible, setErrorVisible] = useState(false);
    const navigate = useNavigate();

    const RegisterUser = async (e) => {
        e.preventDefault();

        if (!name.trim() || !email.trim() || !password.trim() || !confPassword.trim()) {
            setMsg("Semua field wajib diisi!");
            setErrorVisible(true);
            return;
        }

        if (password !== confPassword) {
            setMsg("Password dan konfirmasi password tidak cocok!");
            setErrorVisible(true);
            return;
        }

        try {
            await axios.post('http://localhost:5000/users', {
                name: name,
                email: email,
                password: password,
                confPassword: confPassword
            });
            setMsg('');
            setErrorVisible(false);
            navigate("/");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            } else {
                setMsg("Terjadi kesalahan koneksi ke server.");
            }
            setErrorVisible(true);
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
                <h1 className="title has-text-centered" style={{ color: "#4e73df" }}>Create Account</h1>
                <p className="subtitle has-text-centered" style={{ color: "#858796" }}>
                    Daftarkan akun baru untuk melanjutkan
                </p>

                <form onSubmit={RegisterUser}>
                    {errorVisible && (
                        <div className="notification is-danger is-light">
                            <button className="delete" onClick={() => setErrorVisible(false)}></button>
                            {msg}
                        </div>
                    )}

                    <div className="field mt-5">
                        <label className="label">Name</label>
                        <div className="control has-icons-left">
                            <input
                                type="text"
                                className="input"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                            </span>
                        </div>
                    </div>

                    <div className="field mt-5">
                        <label className="label">Email</label>
                        <div className="control has-icons-left">
                            <input
                                type="email"
                                className="input"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
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
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="field mt-5">
                        <label className="label">Confirm Password</label>
                        <div className="field has-addons">
                            <div className="control is-expanded has-icons-left">
                                <input
                                    type={showConfPassword ? "text" : "password"}
                                    className="input"
                                    placeholder="*******"
                                    value={confPassword}
                                    onChange={(e) => setConfPassword(e.target.value)}
                                    required
                                />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-lock"></i>
                                </span>
                            </div>
                            <div className="control">
                                <button
                                    type="button"
                                    className="button is-light"
                                    onClick={() => setShowConfPassword(!showConfPassword)}
                                >
                                    {showConfPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="field mt-5">
                        <button
                            className="button is-success is-fullwidth"
                            style={{
                                borderRadius: "10px",
                                background: "linear-gradient(90deg, #1cc88a, #17a673)",
                                color: "white",
                                fontWeight: "bold",
                                transition: "transform 0.1s ease-in-out"
                            }}
                            onMouseDown={(e) => e.target.style.transform = "scale(0.97)"}
                            onMouseUp={(e) => e.target.style.transform = "scale(1)"}
                        >
                            Register
                        </button>
                    </div>

                    <p className="has-text-centered mt-4" style={{ color: "#6c757d" }}>
                        Sudah punya akun? <a href="/" style={{ color: "#4e73df" }}>Login di sini</a>
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
};

export default Register;
