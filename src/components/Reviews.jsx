import React, { useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import "./css/App.css";
import "./css/Logger.css";
import ReviewItem from "./ReviewItem.jsx";

// This is React Hooks
const Review = (restaurants) => {
  // TODO: Fix restaurants["restaurants"] bug ??? why not just restaurants
  return (
    <div className={"container top_padding"}>
      <div className="break"></div>
      {restaurants["restaurants"].map((restaurant) => (
        <ReviewItem
          rating={restaurant["rating"]}
          restaurantName={restaurant["restaurant_name"]}
          review={restaurant["review"]}
          title={restaurant["title"]}
        />
      ))}
      <div className="break"></div>
      <Button variant="dark" onClick={() => window.alert("yeet")}>
        New Review
      </Button>
    </div>
  );
};

export default Review;
