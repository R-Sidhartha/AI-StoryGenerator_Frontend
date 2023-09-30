import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
import StoryContext from "../Context/StoryContext";

export default function Stories(props) {
  const { story, showalert } = props;
  const context = useContext(StoryContext);
  const { createPost, deletestory } = context;

  // const navigate = useNavigate();

  // const location = useLocation();
  const handlepost = () => {
    createPost(story.prompt, story.genre, story.content);
    showalert("Story posted Successfully", "success");
  };
  const handleDelete = () => {
    deletestory(story._id);
  };


  // Create a new Date object from the timestamp string
 

  const capitalise = (word) => {
    const text = word.toLowerCase();
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };


  return (
    <>
      <div className="story mx-3" key={story._id}>
        <span
          className="badge"
          style={{
            position: "relative",
            background: "rgb(138, 143, 150)",
            top: "60px",
            left: "44%",
            color: "black",
          }}
        >
          {capitalise(story.genre)}
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
            <h4 className="mx-2">Prompt: </h4>
            <h5>{story.prompt}</h5>
          </div>
          <div className="content text-justify mx-3">
            <h4>Content :</h4>
            <span>{story.content}</span>
          </div>
        </div>
        <div className="postbtns d-flex justify-content-center">
          <div
            className="share d-flex justify-content-between my-2"
            style={{ width: "90%" }}
          >
            <div className="btnshare">
              <button className="btn" style={{color: `${props.mode === "dark" ? "black" : "white"}`}}>
                <i class="fa-regular fa-share-from-square fa-xl"></i>
              </button>
              <button className="btn" onClick={() => handleDelete(story._id)} style={{color: `${props.mode === "dark" ? "black" : "white"}`}}>
                <i class="fa-solid fa-trash fa-xl"></i>
              </button>
            </div>
            <div className="btnpost">
              <button className="btn btn-sm btn-success" onClick={handlepost}>
                Post
              </button>
            </div>
          </div>
        </div>

        {/* {location.pathname === `/viewNote/${inote._id}` && <ViewNote />} */}
      </div>
    </>
  );
}
