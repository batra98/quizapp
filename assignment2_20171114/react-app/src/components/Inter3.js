import React from "react";
import "./NotFound.css";

export default () =>
  <div className="NotFound">
    <h3>Select Your Category</h3>
    <span><a href="/deletequiz">Single Correct Qustions</a></span><br /><br />
    <span><a href="/deletequizmulti">Multi Correct Qustions</a></span>
  </div>;
