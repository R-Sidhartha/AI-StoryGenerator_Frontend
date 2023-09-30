import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import StoryContext from "../Context/StoryContext";
import userpng from './pics/userpng.png'
export default function Posts(props) {
  const { post } = props;
  const context = useContext(StoryContext);
  const { deletePost, upvoteStory,handleuser } = context;
  const [likedPosts, setLikedPosts] = useState([]);
  //   const navigate = useNavigate();

  const location = useLocation();

  const handleDelete = () => {
    deletePost(post._id);
  };
  const handlevote = async () => {
    try {
      // Perform the upvote
      const result = await upvoteStory(post._id);
      post.upvotes=0;
  
      if (result) {
        // If upvoting was successful, update liked status and upvote count
        if (likedPosts.includes(post._id)) {
          // If already liked, remove the post ID from likedPosts
          setLikedPosts(likedPosts.filter((id) => id !== post._id));
          // Decrease the upvote count
          post.upvotes = post.upvotes - 1;
        } else {
          // If not liked, add the post ID to likedPosts
          setLikedPosts([...likedPosts, post._id]);
          // Increase the upvote count
          post.upvotes = post.upvotes + 1;
        }
      } else {
        // Handle upvoting failure, e.g., display an error message
        console.error('Upvoting failed');
      }
    } catch (error) {
      console.error('Error upvoting story:', error);
    }
  };
  
  
  
  
  // Load user data from localStorage on component mount
  useEffect(() => {
    const fetchData = async () => {
      await handleuser();
    };

    fetchData();
    // eslint-disable-next-line
  }, []);

  // Function to render the appropriate icon based on whether the post is liked
  const renderIcon = () => {
    if (likedPosts.includes(post._id)) {
      // If the post is liked, render the liked icon
      return <i className="fa-solid fa-heart fa-xl"></i>;
    } else {
      // If the post is not liked, render the unliked icon
      return <i className="fa-regular fa-heart fa-xl"></i>;
    }
  };

  const timestamp = post.date;

  // Create a new Date object from the timestamp string
  const dateObj = new Date(timestamp);

  // Convert to Indian Standard Time (IST) using toLocaleString with appropriate options
  const options = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const isHomePage = location.pathname === '/';


  const indianTime = dateObj.toLocaleString("en-IN", options);
  const capitalise = (word) => {
    const text = word.toLowerCase();
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };


  return (
    <>
      <div className="story mx-3" key={post._id} style={{color: `${props.mode === "dark" ? "black" : "white"}`,
}}>
        <div className="user d-flex align-items-center" style={{marginTop:'80px'}}>
        <div className="profilepic">
            <div className="card mx-3" style={{ width: "1.8rem" }}>
              <img src={userpng} className="card-img-top" alt="..." />
            </div>
          </div>
          <div className="time d-flex justify-content-between align-items-center" style={{width:'100%'}}>
            {isHomePage ? <h6>Name: {post.user.name}</h6> : <h6>UserName: {post.user.UserName}</h6> } <span>{indianTime}</span>
          </div>
        </div>
        <span
          className="badge"
          style={{
            position: "relative",
            background: "rgb(138, 143, 150)",
            top: "49px",
            left: "44%",
            color: "black",
          }}
        >
          {capitalise(post.genre)}
        </span>
        <div className="box d-flex flex-column">
          <div
            className="prompt"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h6 className="mx-2">Prompt: </h6>
            <h6>{post.prompt}</h6>
          </div>
          <div className="content text-justify mx-3">
            <h6>Content :</h6>
            <span>{post.content}</span>
          </div>
        </div>
        <div className="votebtns d-flex justify-content-between">
          <div className="share d-flex my-2" style={{ width: "90%" }}>
            <div className="btnshare">
              <button className="btn" style={{color: `${props.mode === "dark" ? "black" : "white"}`,
}}>
                <i className="fa-regular fa-share-from-square fa-xl"></i>
              </button>
            </div>
            <div className="btnpost">
              <button className="btn " onClick={() => handlevote(post._id)} style={{color: `${props.mode === "dark" ? "black" : "white"}`,
}}>
                {renderIcon(post._id)}
              </button><span>{post.upvotes}</span>
            </div>
          </div>
          <div className="delete" style={{ width: "150px" }}>
          {isHomePage ? null : (
        <button className="btn my-2" onClick={() => handleDelete(post._id)} style={{color: `${props.mode === "dark" ? "black" : "white"}`,
      }}>
          <i className="fa-solid fa-trash fa-xl"></i>
        </button>
      )}
          </div>
        </div>
      </div>
    </>
  );
}
