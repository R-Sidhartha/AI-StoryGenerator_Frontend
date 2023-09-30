import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Posts from "./Posts";
import StoryContext from "../Context/StoryContext";
import Spinner from "./Spinner";

function Home(props) {
  const { mode, color } = props;
  const context = useContext(StoryContext);
  const { fetchAllPosts, posts } = context;
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("authtoken")) {
      navigate("/login");
    } else {
      fetchAllPosts()
        .then(() => {
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
          setLoading(false);
        });
    }
    // eslint-disable-next-line
  }, []);


  const filterposts = posts.filter((post) =>
    post.genre.toLowerCase().includes(props.searchQuery?.toLowerCase() || "")
  );

  
  return (
    <div
      className="container"
      style={{
        color: `${mode === "dark" ? "black" : "white"}`,
        minHeight: "100vh",
      }}
    >
      <div className="top d-flex justify-content-between my-3">
        <div className="title">
          <h2>AI-STORIES</h2>
        </div>
        <div className="right">
          <button className="btn btn-sm btn-primary mx-2">
            <Link
              className="nav-link"
              to="/GenerateStory"
              style={{ height: "100%", color: "white" }}
            >
              Generate
            </Link>
          </button>
        </div>
      </div>
      <div className="feed">
          <div>
            <div
              className=" text-center my-3"
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
            >
              {loading ? (
                <Spinner /> // Replace with your spinner component
              ) : // Show "NO NOTES TO DISPLAY" if there are no notes
              filterposts.length > 0 ? (
                // Display the search results
                filterposts.map((post) => {
                  return (
                    <Posts
                      key={post._id}
                      post={post}
                      mode={mode}
                      color={color}
                    />
                  );
                }) ||
                posts.map((post) => {
                  return (
                    <Posts
                      key={post._id}
                      post={post}
                      mode={mode}
                      color={color}
                    />
                  );
                })
              ) : (
                posts.length === 0 && "NO Posts TO DISPLAY"
              )}
            </div>
          </div>
      </div>
    </div>
  );
}

export default Home;
