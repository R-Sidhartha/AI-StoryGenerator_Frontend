import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Posts from "./Posts";
import StoryContext from "../Context/StoryContext";
import Spinner from "./Spinner";
import './Scrolltop.css'
import './Responsive.css'

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
const [visible,setVisible]=useState(false)
const handleScrollTop = () => {
  if (window.scrollY > 0) {
    setVisible(true);
  } else {
    setVisible(false);
  }
};

const scrollToTop = () => {
  window.scrollTo(0, 0);
};
  useEffect(() => {
    window.addEventListener("scroll", handleScrollTop);
    return () => {
      window.removeEventListener("scroll", handleScrollTop);
    };
  }, []);
  return (
    <div
      style={{
        color: `${mode === "dark" ? "black" : "white"}`,
        minHeight: "100vh",
      }}
    >
      <div className="top my-3">
        <div className="title">
          <h2 className="text-center">A World of AI Stories</h2>
        </div>
      </div>
      {loading ? (
        <Spinner /> 
      ) : (
        // Show "NO NOTES TO DISPLAY" if there are no notes
        <div className="feed" style={{marginTop:'50px'}}>
          <div>
            <div
              className="posts text-center "
                         >
              {filterposts.length > 0
                ? // Display the search results
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
                : posts.length === 0 && "NO Posts TO DISPLAY"}
            </div>
          </div>
          <div className={`ScrollToTop ${visible ? '':'d-none'}`} onClick={scrollToTop}>
        <b>&#8963;</b> 
      </div>
        </div>
      )}
    </div>
  );
}

export default Home;
