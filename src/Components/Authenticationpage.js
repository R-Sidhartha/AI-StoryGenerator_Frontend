import React from "react";
import Typed from "react-typed";

function Authenticationpage(props) {
  const { mode, castle, illusionbg } = props;
  return (
    <div>
      <div className="storyillusion my-3">
        <div style={{ color: `${mode === "dark" ? "black" : "white"}`,height:'50px' }}>
          <Typed
            strings={[
              "AI's storytelling magic with personalized tales!",
            ]}
            typeSpeed={40}
            backSpeed={50}
            loop
            className="typedtext"
          />
          <br />
          
        </div>
        <div className=" img" style={{ position: "relative" }}>
          <img className="illusionpic" src={illusionbg} alt="" />
          <div className="castlepic">
            <img className="castle" src={castle} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Authenticationpage;
