import React, { useEffect, useRef, useState } from "react"; // important importation

import "./css/App.css";
import Header from "./Header.jsx";
import Connoisseur from "./Connoisseur.jsx";
import Reviews from "./Reviews.jsx";
import {
  Button,
  Card,
  Col,
  Row,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";

const App = () => {
  const [showConnoisseur, setShowConnoisseur] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [recommendation, setRecommendation] = useState("");
  // const [titleEditMode, setTitleEditMode] = useState(false);
  // const [ratingEditMode, setRatingEditMode] = useState(false);

  const toggleConnoisseur = () => {
    setShowConnoisseur(showConnoisseur ? false : true);
    setShowReviews(false);
  };

  const toggleReviews = () => {
    setShowReviews(showReviews ? false : true);
    setShowConnoisseur(false);
  };

  const populateResultCard = (url, recommend) => {
    setImgUrl(url);
    setRecommendation(recommend);
  };

  const renderConnoisseur = () => {
    return (
      <div>
        <Connoisseur populateResultCard={populateResultCard} />
        <Card style={{ width: "15rem", top: "2rem" }}>
          <Card.Img variant="top" src={imgUrl} />
          <Card.Body>
            <Card.Text>{recommendation}</Card.Text>
          </Card.Body>
        </Card>
        ;
      </div>
    );
  };

  // TODO: [BUG] Fix double clicking search to get results
  return (
    <div>
      <div className="container">
        <Header />
        <div className="break" />
        <Row>
          <Col>
            <Button variant="light" onClick={toggleConnoisseur}>
              Connoisseur
            </Button>
          </Col>
          <Col>
            <Button variant="light" onClick={toggleReviews}>
              Reviews
            </Button>
          </Col>
          <Col>
            <Button variant="light">Planner</Button>
          </Col>
        </Row>
        <div className="break" />
        {showConnoisseur ? renderConnoisseur() : null}
        <div className="break" />
        {showReviews ? <Reviews /> : null}
      </div>
    </div>
  );
};

export default App;
