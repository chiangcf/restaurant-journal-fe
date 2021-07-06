import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Dropdown,
  DropdownButton,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import postRestReviews from "./Helpers";
import "./css/App.css";
import "./css/Logger.css";
import ReviewItem from "./ReviewItem.jsx";

// This is React Hooks
const Review = (data) => {
  const [restaurantText, setRestaurantText] = useState("");
  const [ratingText, setRatingText] = useState("");
  const [titleText, setTitleText] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [newReview, setNewReview] = useState(false);

  const toggleNewReview = () => {
    setNewReview(newReview ? false : true);
  };

  // Checks if the form in empty, then make the POST request to the lambda
  const createReview = () => {
    if (
      restaurantText !== "" ||
      ratingText !== "" ||
      titleText !== "" ||
      reviewText !== ""
    ) {
      if (parseInt(ratingText) > 5) {
        window.alert("Rating cannot be greater than 5");
      } else {
        postRestReviews(restaurantText, ratingText, titleText, reviewText);
        toggleNewReview();
      }
    } else {
      window.alert("Something is missing! >:|");
    }
  };

  // Makes the "form" show up and hides the button
  const renderNewReview = () => {
    return (
      <Form>
        <Form.Group as={Row}>
          <Col sm={12}>
            <Form.Control
              placeholder="restaurant name"
              value={restaurantText}
              onChange={(e) => setRestaurantText(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={12}>
            <Form.Control
              placeholder="rating 1-5"
              value={ratingText}
              onChange={(e) => setRatingText(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={12}>
            <Form.Control
              placeholder="title"
              value={titleText}
              onChange={(e) => setTitleText(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={12}>
            <Form.Control
              as="textarea"
              placeholder="review"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
          </Col>
        </Form.Group>

        {/* <Form.Group as={Row}>
          <Col sm={12}>
            <div className="mb-3">
              <Form.Check
                inline
                label="1"
                type="radio"
                onChange={console.log("yeet")}
              />
              <Form.Check inline label="2" type="radio" />
              <Form.Check inline label="3" type="radio" />
              <Form.Check inline label="4" type="radio" />
              <Form.Check inline label="5" type="radio" />
            </div>
          </Col>
        </Form.Group> */}

        <Form.Group as={Row}>
          <Row>
            <Col sm={5}>
              <Button variant="secondary" onClick={toggleNewReview}>
                cancel
              </Button>
            </Col>
            <Col sm={5}>
              <Button variant="dark" onClick={createReview}>
                submit
              </Button>
            </Col>
          </Row>
        </Form.Group>
      </Form>
    );
  };

  // Button acts as the "default" view
  const renderButton = () => {
    return (
      <Button variant="dark" className="top_padding" onClick={toggleNewReview}>
        new review
      </Button>
    );
  };

  return (
    <div>
      <div className={"container top_padding"}>
        {newReview ? renderNewReview() : renderButton()}
      </div>
      <div className={"container top_padding"}>
        <div className="break"></div>
        {data["restaurants"].map((restaurant) => (
          <ReviewItem
            restaurantName={restaurant["restaurant_name"]}
            rating={restaurant["rating"]}
            title={restaurant["title"]}
            review={restaurant["review"]}
          />
        ))}
        <div className="break"></div>
      </div>
    </div>
  );
};

export default Review;
