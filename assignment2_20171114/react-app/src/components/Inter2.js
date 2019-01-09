import React from "react";
import "./NotFound.css";

export default () =>
  <div className="NotFound">
    <h3>Select Your Category</h3>
    <span><a href="/createquiz">Single Correct Qustions</a></span><br /><br />
    <span><a href="/createquizmulti">Multi Correct Qustions</a></span>
  </div>;
