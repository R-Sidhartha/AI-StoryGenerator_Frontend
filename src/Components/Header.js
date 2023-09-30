import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import darkmode from "./pics/darkmode.png";
import lightmode from "./pics/lightmode.png";
import userpng from "./pics/userpng.png";
import './Header.css'

export default function Header(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authtoken");
    localStorage.removeItem("userData");
    navigate("/login");
  };
  const isAuthTokenAvailable = localStorage.getItem("authtoken");
  const [searchQuery, setSearchQuery] = useState("");
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    props.onSearch(searchQuery); // Pass the search query back to the parent component
  };
  const handleClick = async (e) => {
    e.preventDefault();
    navigate("/user");
  };
  const inputstyle = {
    background: `${props.mode !== "dark" ? "#292828" : "white"}`,
    color: `${props.mode === "dark" ? "black" : "white"}`,
  };

  return (
    <div>
      <nav
        className={`navbar navbar-expand-lg navbar-${props.mode === "dark" ? "light" : "dark"} bg-transparent
        }`}
      >
        <Link className="navbar-brand"   to={isAuthTokenAvailable ? '/' : '/login'} disabled={!isAuthTokenAvailable}
>
          AI-StoryGenerator
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {isAuthTokenAvailable ? (
              <li
                className={`nav-item ${
                  location.pathname === "/" ? "active" : ""
                }`}
              >
                <Link
                  className="nav-link"
                  to="/"
                  disabled={!isAuthTokenAvailable}
                >
                  Home <span className="sr-only">(current)</span>
                </Link>
              </li>
            ) : null}
          </ul>
          <div
            className="leftnav d-flex justify-content-between "
            style={{ width: `${isAuthTokenAvailable ? "500px" : "135px"}` }}
          >
            <div className="authbtns">
              {!isAuthTokenAvailable ? (
                <div className="btns">
                  {location.pathname === "/signup" ? (
                    <Link
                      className={`btn btn-${props.mode === "dark" ? "light" : "dark"} mx-1`}
                      to="/login"
                      role="button"
                    >
                      Login
                    </Link>
                  ) : null}
                  {location.pathname === "/login" ? (
                    <Link
                      className={`btn btn-${props.mode === "dark" ? "light" : "dark"} mx-1`}
                      to="/signup"
                      role="button"
                    >
                      Signup
                    </Link>
                  ) : null}
                </div>
              ) : (
                <form className="form-inline my-2 my-lg-0 afterlogin">
                  <div className="searchbar">
                  <input
                    className="form-control mr-sm-2 input-placeholder"
                    type="search"
                    placeholder="Search by Heading, tag, or title"
                    aria-label="Search"
                    value={searchQuery}
                    onChange={handleInputChange}
                    style={inputstyle}
                  />
                  <button
                    className={`btn btn-outline-${props.mode === "dark" ? "dark" : "light"} my-2 my-sm-0`}
                    type="submit"
                    onClick={handleSearch}
                  >
                    Search
                  </button>
                  </div>
                  <div className="userloggedin">
                  <Link
                    className="btn btn-primary mx-1"
                    to="/user"
                    role="button"
                    onClick={handleClick}
                    style={{ background: "none", border: "none" }}
                  >
                    <img src={userpng} alt="" style={{ width: "30px" }} />
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={handleLogout}
                  >
                    Log Out{" "}
                  </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className="mode">
              <img
                onClick={props.darkmode}
                src={props.mode === "light" ? lightmode : darkmode}
                alt=""
               
              />
            </div>
    </div>
  );
}
