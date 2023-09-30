import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const [credentials, setcredentials] = useState({
    UserName: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    // API Call
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UserName: credentials.UserName,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.Success) {
      localStorage.setItem("authtoken", json.authtoken);
      navigate("/");
    } else {
      alert("invalid creds");
    }
  };
  const onChange = (e) => {
    setcredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  const inputstyle = {
    background: `${props.mode !== "dark" ? "rgba(41, 40, 40, 0.44)" : "white"}`,    color: `${props.mode === "dark" ? "black" : "white"}`,
  };

  return (
    <div
      className="container my-4 d-flex flex-column align-items-center"
      style={{ color: `${props.mode === "dark" ? "black" : "white"}`,minHeight:'100vh' }}
    >
      <h3>Login to Generate Stories</h3>
      <form style={{ width: "40vw" }}>
        <div className="form-group my-3">
          <label htmlFor="UserName">UserName</label>
          <input
            type="text"
            className="form-control"
            id="email"
            name="UserName"
            value={credentials.UserName}
            onChange={onChange}
            style={inputstyle}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            style={inputstyle}
          />
        </div>
        <button type="submit" className={`btn btn-${props.mode === "dark" ? "dark" : "light"} `} onClick={handleLogin}>
          Log in
        </button>
      </form>{" "}
    </div>
  );
}
