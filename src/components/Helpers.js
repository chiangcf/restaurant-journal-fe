// API Create / Update Review

import axios from "axios";

const postRestReviews = async (restaurantName, rating, title, review) => {
  axios
    .post(
      "https://i9iptge7pj.execute-api.us-east-1.amazonaws.com/api/create_review",
      {
        restaurant_name: restaurantName,
        rating: rating,
        title: title,
        review: review,
      }
    )
    .then(function (response) {
      console.log("Successfully updated ", restaurantName);
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export default postRestReviews;
