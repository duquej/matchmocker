import React from "react";
import "./Window.css";

function Window() {
  return (
    <div className="container">
      <div className="row">
        <div className="column left">
          <span className="dot" style={{ background: "#ED594A" }}></span>
          <span className="dot" style={{ background: "#FDD800" }}></span>
          <span className="dot" style={{ background: "#5AC05A" }}></span>
        </div>
        <div className="column middle">
          <input
            className="domain"
            type="text"
            value="https://www.gmail.com/inbox"
            readOnly
          />
        </div>
      </div>

      <div className="content" style={{ textAlign: "center" }}>
        <h3>
          Jonathan has accepted your request for a mock interview at 2:30 PM on
          5/11/2020!
        </h3>
        <p>
          Zoom Link:
          <a href="https://cornell.zoom.us/j/313202005">
            {" "}
            https://cornell.zoom.us/j/313202005
          </a>
        </p>
      </div>
    </div>
  );
}

export default Window;
