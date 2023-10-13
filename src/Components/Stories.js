import React, { useContext, useRef, useState } from "react";
import StoryContext from "../Context/StoryContext";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";
import { toPng } from 'html-to-image';

export default function Stories(props) {
  const { story, showalert } = props;
  const context = useContext(StoryContext);
  const { createPost, deletestory } = context;
  const [showModal, setShowModal] = useState(false);
  const divRef = useRef();


  const handleDownloadClick = () => {
    divRef.current.style.backgroundColor = 'black';
    divRef.current.style.color='white'
    divRef.current.style.width = '850px';
    divRef.current.style.padding = '10px 10px';
  
    toPng(divRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'FictionFusionAI_story.png';
        link.href = dataUrl;
        link.click();
  
        // Reset the properties to its original state after download
        divRef.current.style.backgroundColor = '';
        divRef.current.style.color=''
        divRef.current.style.padding=''
        divRef.current.style.width=''
      })
      .catch((err) => {
        console.log(err);
  
        // Ensure the properties are reset even if there's an error
        divRef.current.style.backgroundColor = '';
        divRef.current.style.color=''
        divRef.current.style.padding='';
        divRef.current.style.width='';
      });
  };
  

 
  
  

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
    navigate("/");
  };

  const capitalise = (word) => {
    const text = word.toLowerCase();
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  return (
    <>
    <div className="d-flex flex-column">
      <div className="story  mt-3 " key={story._id} ref={divRef}>
        <span className="storybadge">{capitalise(story.genre)}</span>
        <div className="box ">
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
          <div className="content text-justify mx-2 my-3">
            <h5>Content :</h5>
            <span className="storydetails">{story.content}</span>
          </div>
        </div>
      </div>
        <div className="postbtns d-flex justify-content-center">
          <div
            className="share d-flex justify-content-between my-2"
            style={{ width: "90%" }}
          >
            <div className="btns">
              <button
                className="btn"
                style={{
                  color: `${props.mode === "dark" ? "black" : "white"}`,
                }}
                onClick={handleDownloadClick}
              >
                <i class="fa-solid fa-download fa-lg"></i>{" "}
              </button>
              <button
                className="btn"
                onClick={handleDelete}
                style={{
                  color: `${props.mode === "dark" ? "black" : "white"}`,
                }}
              >
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
