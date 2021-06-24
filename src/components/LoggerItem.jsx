import React, { useState } from "react"; // important importation
import "./css/App.css";
import "./css/Logger.css";

// Make this pretty like a grid maybe?
// Possibly put an image inside span
const Logger = ({ rating, restaurantName, review, title }) => {
  return (
    <div class="plan">
      <h3>{restaurantName}</h3>
      <h4> {rating}/5</h4>

      <ul>
        <li>
          <b
            onDoubleClick={() => {
              console.log("sape");
            }}
          >
            {title}
          </b>
        </li>
        <li> {review}</li>
      </ul>
      <button className="primary" onClick={() => window.alert("YEET")}>
        Edit
      </button>
    </div>
  );
};

export default Logger;
