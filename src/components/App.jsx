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
import axios from "axios";

const App = () => {
  const [showConnoisseur, setShowConnoisseur] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [recommendation, setRecommendation] = useState("");

  // Review
  const [restaurants, setRestaurants] = useState();
  const [isLoading, setLoading] = useState(true);

  const getRestReviews = async () => {
    console.log("getRestReviews");
    const URL =
      "https://i9iptge7pj.execute-api.us-east-1.amazonaws.com/api/get_reviews";
    try {
      await axios.get(URL).then((response) => {
        setRestaurants(response.data);
        // setLoading(false);
      });
    } catch (err) {
      console.error("Could not load data", err);
      // setLoading(true);
    }
  };

  const toggleConnoisseur = () => {
    setShowConnoisseur(showConnoisseur ? false : true);
    setShowReviews(false);
  };

  // TODO: Move getReviews here so it doesn't call it every re-render
  const toggleReviews = () => {
    setShowReviews(showReviews ? false : true);
    setShowConnoisseur(false);
  };

  const populateResultCard = (url, recommend) => {
    setImgUrl(url);
    setRecommendation(recommend);
  };

  useEffect(() => {
    getRestReviews();
    console.log(restaurants);
  }, []);

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
              connoisseur
            </Button>
          </Col>
          <Col>
            <Button variant="light" onClick={toggleReviews}>
              reviews
            </Button>
          </Col>
          <Col>
            <Button variant="light">planner</Button>
          </Col>
        </Row>
        <div className="break" />
        {showConnoisseur ? renderConnoisseur() : null}
        <div className="break" />
        {showReviews ? <Reviews restaurants={restaurants} /> : null}
      </div>
    </div>
  );
};

export default App;
