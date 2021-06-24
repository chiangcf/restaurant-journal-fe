import React, { useEffect, useState } from "react";
import "./css/App.css";
import "./css/Logger.css";
import LoggerItem from "./LoggerItem.jsx";

// This is React Hooks
const Logger = () => {
  const [restaurants, setRestaurants] = useState();
  const [isLoading, setLoading] = useState(true);
  const axios = require("axios");

  const getRestReviews = async () => {
    const URL =
      "https://i9iptge7pj.execute-api.us-east-1.amazonaws.com/api/get_reviews";
    try {
      await axios.get(URL).then((response) => {
        setRestaurants(response.data);
        setLoading(false);
        console.log(restaurants);
      });
    } catch (err) {
      console.error("Could not load data", err);
      setLoading("error");
    }
  };

  useEffect(() => {
    getRestReviews();
  }, []);

  // LOADING HEAVEN
  // TODO: Maybe put the whole App in loading stage
  if (isLoading) {
    return <div className="App"></div>;
  }

  // TODO: Able to modify reviews and title then send POST
  return (
    <div id="pricing-table" className="clear">
      <h1>Reviews</h1>

      {restaurants.map((restaurant) => (
        // console.log(restaurant)
        <LoggerItem
          rating={restaurant["rating"]}
          restaurantName={restaurant["restaurant_name"]}
          review={restaurant["review"]}
          title={restaurant["title"]}
        />
      ))}
    </div>
  );
};

export default Logger;
