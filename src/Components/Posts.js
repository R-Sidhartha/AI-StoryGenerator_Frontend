import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StoryContext from "../Context/StoryContext";
import userpng from "./pics/userpng.png";
import VoteCounts from "./Votes";
import "./post.css";
import ConfirmModal from "./ConfirmModal";
import { toPng } from 'html-to-image';

export default function Posts(props) {
  const { post } = props;
  const context = useContext(StoryContext);
  const { deletePost, handleuser } = context;
  const [showModal, setShowModal] = useState(false);
  const divRef = useRef();

  const navigate = useNavigate();

  const location = useLocation();

  const handleDownloadClick = (e) => {
    e.preventDefault()
    divRef.current.style.width = '648px';
    divRef.current.style.backgroundColor = 'black';

    toPng(divRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'FictionFusionAI_post.png';
        link.href = dataUrl;
        link.click();
        divRef.current.style.width = '';
        divRef.current.style.backgroundColor = '';

      })
      .catch((err) => {
        console.log(err);
        divRef.current.style.width = '';
        divRef.current.style.backgroundColor = '';

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
    deletePost(post._id);
    navigate("/user");
  };
  // Load user data from localStorage on component mount
  useEffect(() => {
    const fetchData = async () => {
      await handleuser();
    };

    fetchData();
    // eslint-disable-next-line
  }, []);

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
  const isHomePage = location.pathname === "/";

  const indianTime = dateObj.toLocaleString("en-IN", options);
  const capitalise = (word) => {
    const text = word.toLowerCase();
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  return (
    <>
    <div>
      <div className={` ${['romantic', 'comedy', 'drama', 'fiction', 'adventure', 'horror', 'suspense', 'thriller'].includes(post.genre) ? post.genre : 'default'} `} style={{borderRadius:'50px'}} ref={divRef}>
        <div
          className="story postdetails "
          key={post._id}
          style={{ color:'white' }}
        >
          <div
            className="user d-flex align-items-center"
            
          >
            <div className="profilepic">
              <div className="card mx-3" style={{ width: "1.8rem" }}>
                <img src={userpng} className="card-img-top" alt="..." />
              </div>
            </div>
            <div
              className="time d-flex justify-content-between align-items-center"
              style={{ width: "100%" }}
            >
              {isHomePage ? (
                <h6> {post.user.name}</h6>
              ) : (
                <h6> {post.user.UserName}</h6>
              )}{" "}
              <span>{indianTime}</span>
            </div>
          </div>
          <span className='badge my-3'>{capitalise(post.genre)}</span>
          <div className={'box d-flex flex-column'}>
            <div
              className="prompt"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h5 className="mx-2" style={{margin:'0px'}}>Prompt: </h5>
              <span className="storyprompt">{post.prompt}</span>
            </div>
            <div className="content text-justify ">
              <div className='cont'>
              <h5>Content :</h5>
              <span className="storydetails">{post.content}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
              <div className="votebtns d-flex justify-content-between">
                <div className="share d-flex " style={{ width: "90%" }}>
                  <VoteCounts postId={post._id} post={post} mode={props.mode}/>{" "}
                </div>
                <div className="delete" style={{ width: "150px" }}>
                  {isHomePage ? null : (
                    <button
                      className="btn my-2"
                      onClick={handleDelete}
                      style={{
                        color:  `${props.mode === "dark" ? "black" : "white"}`,
                      }}
                    >
                      <i className="fa-solid fa-trash fa-lg"></i>
                    </button>
                  )}
                  <button
                className="btn"
                style={{
                  color: `${props.mode === "dark" ? "black" : "white"}`,
                }}
                onClick={handleDownloadClick}
              >
                <i className="fa-solid fa-download fa-lg"></i>{" "}
              </button>
                </div>
              </div>
      </div>
      {showModal && (
        <ConfirmModal
          title="Delete Post ?"
          message="Are you sure, you want to delete this Post?"
          handleCancelDelete={handleCancelDelete}
          handleConfirmDelete={handleConfirmDelete}
          handleDelete={handleDelete}
          mode={props.mode}
          color={props.color}
          postId={post._id}
        />
      )}
    </>
  );
}
