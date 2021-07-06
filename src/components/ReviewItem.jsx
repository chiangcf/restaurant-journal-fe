import React, { useState } from "react"; // important importation
import Button from "react-bootstrap/Button";
import postRestReviews from "./Helpers";
import "./css/App.css";
import "./css/Logger.css";
import { ButtonGroup, Card, Form } from "react-bootstrap";

// Make this pretty like a grid maybe?
const Review = ({ restaurantName, rating, title, review }) => {
  const [editMode, setEditMode] = useState(false);
  const [restaurantText, setRestaurantText] = useState(restaurantName);
  const [ratingText, setRatingText] = useState(rating);
  const [titleText, setTitleText] = useState(title);
  const [reviewText, setReviewText] = useState(review);

  const toggleEditMode = () => {
    setEditMode(editMode ? false : true);
  };

  const cancelEdit = () => {
    setRestaurantText(restaurantName);
    setRatingText(rating);
    setTitleText(title);
    setReviewText(review);
    toggleEditMode();
  };

  const submitReview = () => {
    postRestReviews(restaurantText, ratingText, titleText, reviewText);
    toggleEditMode();
  };

  const renderEditView = () => {
    return (
      <Card style={{ width: "15rem" }}>
        <Card.Img variant="top" src={"https://picsum.photos/200"} />
        <Card.Body>
          <Form.Group>
            <Form.Control
              type="text"
              value={restaurantText}
              onChange={(e) => setRestaurantText(e.target.value)}
            />
            <Form.Control
              type="text"
              value={ratingText}
              onChange={(e) => setRatingText(e.target.value)}
            />
            <Form.Control
              type="text"
              value={titleText}
              onChange={(e) => setTitleText(e.target.value)}
            />
            <Form.Control
              as="textarea"
              rows={3}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
          </Form.Group>
        </Card.Body>
        <ButtonGroup>
          <Button variant="secondary" size="sm" onClick={cancelEdit}>
            cancel
          </Button>
          <Button variant="dark" size="sm" onClick={submitReview}>
            submit
          </Button>
        </ButtonGroup>
      </Card>
    );
  };

  const renderDefaultView = () => {
    return (
      <Card style={{ width: "15rem" }}>
        <Card.Img variant="top" src={"https://picsum.photos/200"} />
        <Card.Body>
          <Card.Title>
            {restaurantText} - {ratingText}/5
          </Card.Title>
          <Card.Text>{titleText}</Card.Text>
          <Card.Text>{reviewText}</Card.Text>
        </Card.Body>
        <Button variant="light" size="sm" onClick={toggleEditMode}>
          edit
        </Button>
      </Card>
    );
  };
  // TODO: ADD the modify review
  return editMode ? renderEditView() : renderDefaultView();
};

export default Review;
