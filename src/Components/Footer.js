import React from 'react'

export default function Footer(props) {
  return (
    <div className="card text-center my-3" style={{ color: `${props.mode === "dark" ? "black" : "white"}`,width:'100vw',background:`${props.mode === "dark" ? "rgb(230, 230, 230)" : "rgb(11, 15, 18)"}` }}>
  <div className="card-header ">
    Featured
  </div>
  <div className="card-body">
    <h5 className="card-title">Copyright &copy;  All rights reserved.</h5>
    <p className="card-text">Embark on a new era of note-taking with iNotebook - your trusty companion in the digital world. From its user-friendly interface to its powerful organizational tools and secure environment, iNotebook is designed to enhance your productivity and creativity. Embrace the power of seamless collaboration and customization, as you jot down your ideas, goals, and dreams.</p>
<p>
Thank you for visiting and exploring iNoteBook</p>
    <h6 className="card-title">Designed and developed by R SIDHARTHA.</h6>
  </div>
</div>
  )
}
