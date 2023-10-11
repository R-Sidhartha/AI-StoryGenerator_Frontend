import React from "react";

const ConfirmModal = ({
  title,
  message,
  handleCancelDelete,
  handleConfirmDelete,
  mode,
  postId
}) => {
  const inputstyle = {
    background: `${mode !== "dark" ? "black" : "white"}`,
    color: `${mode === "dark" ? "black" : "white"}`,
    border: `${mode === "dark" ? "" : "2px solid white"}`,
  };

  return (
    <>
      <div className="modal" tabIndex="-1" style={{ display: "block" }}>
        <div className="modal-dialog">
          <div className="modal-content" style={inputstyle}>
            <div className="modal-header border-0">
              <h5 className="modal-title" >{title}</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span
                  aria-hidden="true"
                  onClick={handleCancelDelete}
                  style={{ color: `${mode === "dark" ? "black" : "white"}` }}
                >
                  &times;
                </span>
              </button>
            </div>
            <div className="modal-body border-0" >
              <p>{message}</p>
            </div>
            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={handleCancelDelete}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleConfirmDelete(postId)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;
