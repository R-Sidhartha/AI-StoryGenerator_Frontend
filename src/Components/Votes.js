import React, { useEffect, useState } from "react";

const VoteCounts = ({ postId,post,mode }) => {
  const [upvotes, setUpvotes] = useState(post.upvotes||0);
  const [downvotes, setDownvotes] = useState(post.downvotes||0);
  const [voted, setVoted] = useState(""); // To track the user's vote
  const [userVote, setUserVote] = useState(null); // User's vote type (upvote, downvote, or null)

  const host = "https://fictionfusionai-server-8xm2.onrender.com";

  const voteStory = async (voteType) => {
    try {
      const response = await fetch(
        `${host}/api/votes/${postId}/${voteType}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("authtoken"),
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Error ${voteType} story. Status: ${response.status}`);
      }
      // Optionally, you can handle the response or perform other actions
      const data = await response.json();
      const { upvotes, downvotes } = data;
      setVoted(voteType);
      setUpvotes(upvotes);
      setDownvotes(downvotes);
    } catch (error) {
      console.error(`Error ${voteType} story:`, error);
      // Handle the error, display an error message, or return false if needed
    }
  };
  useEffect(() => {
    // Fetch votes for the post and check if the user has voted
    fetch(`${host}/api/votes/${postId}/votes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authtoken"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const { userVote } = data;
        setUserVote(userVote); // Set the user's vote type
      })
      .catch((error) => {
        console.error("Error fetching votes:", error);
      });
  }, [postId]);


  return (
    <div>
      <button className="btn mx-3"
        onClick={() => voteStory("upvote")}
        disabled={userVote === "upvote"}
        style={{ color: voted === "upvote" ? "green" : "black", background: `${mode === "dark" ? "transparent" : "white"}` }}
      >
        <i className="fas fa-thumbs-up fa-lg"></i> 
      </button>
      <span> {upvotes}</span>

      <button className="btn mx-3"
        onClick={() => voteStory("downvote")}
        disabled={userVote === "downvote"}
        style={{ color: voted === "downvote" ? "red" : "black" ,background: `${mode === "dark" ? "transparent" : "white"}`}}
      >
        <i className="fas fa-thumbs-down fa-lg"></i> 
      </button>
      <span> {downvotes}</span>
    </div>
  );
};

export default VoteCounts;
