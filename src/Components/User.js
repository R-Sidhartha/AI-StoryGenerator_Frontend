import React, { useContext, useEffect, useState } from "react";
import StoryContext from "../Context/StoryContext";
import MyStories from "./MyStories";
import userpng from "./pics/userpng.png";
import AllStories from "./AllStories";
export default function User(props) {
  const context = useContext(StoryContext);
  const { user, handleuser } = context;
  const { mode, color,showalert } = props;
  const [isAllstories, setisAllstroies] = useState(false);


  const handleAllStories = (e) => {
    e.preventDefault();
        setisAllstroies(true);
  };
  const handleMyPosts = (e) => {
    e.preventDefault();
        setisAllstroies(false);
  };

  const inputstyle = {
    background: `${props.mode !== "dark" ? "#292828" : "white"}`,
    color: `${props.mode === "dark" ? "black" : "white"}`,
  };

  const timestamp = user.date;

  // Create a new Date object from the timestamp string
  const dateObj = new Date(timestamp);

  // Convert to Indian Standard Time (IST) using toLocaleString with appropriate options
  const options = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const indianTime = dateObj.toLocaleString("en-IN", options);

  // Load user data from localStorage on component mount
  useEffect(() => {
    const fetchData = async () => {
      await handleuser();
    };

    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ color: `${props.mode === "dark" ? "black" : "white"}` }}>
      <h2 className="my-3 text-center">Profile Info</h2>
      <div className=" d-flex flex-column-reverse" >
        {!isAllstories ? (
          <div className="mystories">
          <h1 className="text-center" style={{ marginTop: "50px" }}>
            My Posts
          </h1>
          <MyStories
            mode={mode}
            color={color}
            userId={user._id}
            searchQuery={props.searchQuery}
            />
        </div>
            ):(
              <div className="Allstories">
          <h1 className="text-center" style={{ marginTop: "50px" }}>
            ALL Stories
          </h1>
          <AllStories
            mode={mode}
            color={color}
            showalert={showalert}
            searchQuery={props.searchQuery}
            />
        </div>
            )}
        <div
          className=" d-flex mx-3 justify-content-center  align-items-center"
          style={{ color: `${props.mode === "dark" ? "black" : "white"}` }}
        >
          <div className="profilepic">
            <div className="card mx-3" style={{ width: "10rem" }}>
              <img src={userpng} className="card-img-top" alt="..." />
            </div>
          </div>
          <form className="mx-3" style={{ width: "50vw" }}>
            <div className="row mb-3 my-4">
              <label htmlFor="name" className="col-sm-2 col-form-label">
                Name :
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  defaultValue={user.name}
                  style={inputstyle}
                  disabled
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="username" className="col-sm-2 col-form-label">
                UserName :
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  defaultValue={user.UserName}
                  style={inputstyle}
                  disabled
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="stories" className="col-sm-2 col-form-label">
                TotalPosts :
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="stories"
                  defaultValue={user.UserName}
                  style={inputstyle}
                  disabled
                />
              </div>
            </div>
            <div className="lower d-flex justify-content-between">
              {!isAllstories ? (
              <button
                className="btn btn-sm btn-dark"
                onClick={ handleAllStories }
              >
                All Stories
              </button>
              ):(
                <button
                className="btn btn-sm btn-dark"
                onClick={ handleMyPosts }
              >
                My Posts
              </button>
              )}
              <span style={{ float: "right" }}>Created on : {indianTime}</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
