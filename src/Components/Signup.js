import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup(props) {
  const [credentials, setcredentials] = useState({
    name: "",
    UserName: "",
    cpassword: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    if (
      credentials.password === credentials.cpassword 
    )
        // API Call
        try {
          const response = await fetch(
            "http://localhost:5000/api/auth/createuser",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",

              },
              body: JSON.stringify({
                name: credentials.name,
                UserName: credentials.UserName,
                password: credentials.password,
              }),
            }
          );

          // Check if the response is not empty
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const json = await response.json();
          if (json.Success) {
            props.showalert("Account created, Please login", "success");
            navigate("/login");
          } else {
            alert("invalid creds");
          }
        } catch (error) {
          console.error("Error parsing JSON response:", error);
          // Handle the error here (e.g., show an error message to the user)
        }
    else {
      props.showalert("Incorrect confirm passwod", "danger");
    }
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setcredentials({
      ...credentials,
      [name]: value,
    });
    // }
  };
  const inputstyle = {
    background: `${props.mode !== "dark" ? "rgba(41, 40, 40, 0.44)" : "white"}`,    color: `${props.mode === "dark" ? "black" : "white"}`,
  };
  return (
    <div
      className="container my-4 d-flex flex-column align-items-center"
      style={{
        color: `${props.mode === "dark" ? "black" : "white"}`,
        minHeight: "100vh",
      }}
    >
      <h3 style={{ textAlign: "center" }}>Create Your StoryGenerator account</h3>
      <form onSubmit={handleCreate} style={{ width: "40vw" }}>
        <div className="form-group my-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={credentials.name}
            onChange={onChange}
            style={inputstyle}
            minLength={3}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="UserName">UserName</label>
          <input
            type="text"
            className="form-control"
            id="UserName"
            name="UserName"
            aria-describedby="emailHelp"
            value={credentials.UserName}
            onChange={onChange}
            style={inputstyle}
            minLength={5}
            required
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
            minLength={5}
            required
            style={inputstyle}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            value={credentials.cpassword}
            onChange={onChange}
            style={inputstyle}
          />
        </div>

        <button type="submit" className={`btn btn-${props.mode === "dark" ? "dark" : "light"} `}>
          Create
        </button>
      </form>{" "}
    </div>
  );
}
