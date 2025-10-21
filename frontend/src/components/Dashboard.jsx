import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState(0);
  const navigate = useNavigate();


  const axiosJWT = axios.create();

  useEffect(() => {
    refreshToken();
  }, []);


  axiosJWT.interceptors.request.use(async (config) => {
    const currentDate = new Date();
    if (expire * 1000 < currentDate.getTime()) {
      const response = await axios.get("http://localhost:5000/token");
      config.headers.Authorization = `Bearer ${response.data.accessToken}`;
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      setName(decoded.name);
      setExpire(decoded.exp);
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });


  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      setName(decoded.name);
      setExpire(decoded.exp);
      getUsers(response.data.accessToken);
    } catch (error) {
      if (error.response) {
        navigate("/");
      }
    }
  };

  const getUsers = async (accessToken) => {
    try {
      const response = await axiosJWT.get("http://localhost:5000/users", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <section className="section">
      <div className="container">
        <nav className="level">
          <div className="level-left">
            <h1 className="title">Dashboard</h1>
          </div>
        </nav>

        <h2 className="subtitle">Welcome, <strong>{name}</strong> 👋</h2>

        <div className="box">
          <h3 className="title is-5">List of Users</h3>
          <table className="table is-striped is-fullwidth">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}