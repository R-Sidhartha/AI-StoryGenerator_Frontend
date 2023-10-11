import React, { useContext,useState } from "react";
import StoryContext from "../Context/StoryContext";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";

export default function Stories(props) {
  const { story, showalert } = props;
  const context = useContext(StoryContext);
  const { createPost, deletestory } = context;
  const [showModal, setShowModal] = useState(false);

  const handleDelete = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleCancelDelete = (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  const handleConfirmDelete = () => {
    // e.preventDefault();
    setShowModal(false);
    deletestory(story._id);
    navigate("/user");
  };

  const navigate = useNavigate();

  const handlepost = () => {
    createPost(story.prompt, story.genre, story.content);
    showalert("Story posted Successfully", "success");
    navigate('/')
  };
 


 

  const capitalise = (word) => {
    const text = word.toLowerCase();
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };


  return (
    <>
      <div className="story mx-3 my-3" key={story._id}>
        <span
          className="storybadge"
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
            <h5 className="mx-2">Prompt: </h5>
            <span className="storyprompt">{story.prompt}</span>
          </div>
          <div className="content text-justify mx-1">
            <h5>Content :</h5>
            <span className="storydetails">{story.content}</span>
          </div>
        </div>
        <div className="postbtns d-flex justify-content-center">
          <div
            className="share d-flex justify-content-between my-2"
            style={{ width: "90%" }}
          >
            <div className="btnshare">
              <button className="btn" style={{color: `${props.mode === "dark" ? "black" : "white"}`}}>
                <i class="fa-regular fa-share-from-square fa-lg"></i>
              </button>
              <button className="btn" onClick={handleDelete} style={{color: `${props.mode === "dark" ? "black" : "white"}`}}>
                <i class="fa-solid fa-trash fa-lg"></i>
              </button>
            </div>
            <div className="btnpost">
              <button className="btn btn-sm btn-success" onClick={handlepost}>
                Post
              </button>
            </div>
          </div>
        </div>

      </div>
      {showModal && (
        <ConfirmModal
          title="Delete Story ?"
          message="Are you sure, you want to delete this Story?"
          handleCancelDelete={handleCancelDelete}
          handleConfirmDelete={handleConfirmDelete}
          handleDelete={handleDelete}
          mode={props.mode}
          color={props.color}
          postId={story._id}
        />
      )}
    </>
  );
}
