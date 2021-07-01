import React, { useState } from "react";
import "./css/App.css";
import { Button, Col, Figure, Form, Row } from "react-bootstrap";

// This is React Hooks
const Connoisseur = (props) => {
  const [resultText, setResultText] = useState("");
  const [imageUrl, setImageUrl] = useState(
    "https://picsum.photos/200?grayscale?blur=2"
  );
  const [cuisine, setCuisine] = useState("");
  const [location, setLocation] = useState("");

  // This is our HTTP client
  const axios = require("axios");

  const onChangeCuisine = (e) => {
    setCuisine(e.target.value);
  };

  const onChangeLocation = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cuisine.trim() && location.trim()) {
      getRandRest(cuisine, location);
    } else {
      alert("Please both forms");
    }
  };

  // Calls the restaurant-journal lambda to get a random restaurant
  const getRandRest = (term, location) => {
    const apiKey =
      "dP7ema0d4sMqlW7K-nbZkjwLGrRwGp-26M-FyEtVzacEqFV8Pn3VG_VuhL-NZUshSRT0ZtJhLvlixb53M_fCZ8-xztkAmmbwS1YpOSgKqaGn2xOONrpk02KRQhG4YHYx";
    const URL = `https://i9iptge7pj.execute-api.us-east-1.amazonaws.com/api/random-restaurant/${term}/${location}/${apiKey}`;
    axios({
      method: "get",
      url: URL,
    })
      .then((response) => {
        const restaurant = response.data;
        const name = restaurant["name"];
        const address = restaurant["location"]["address1"];
        const recommendation = `You should try ${name} which is located in ${address}`;
        setImageUrl(restaurant["image_url"]);
        setResultText(recommendation); // Sets the text to the name of the restaurant
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Control
              value={cuisine}
              onChange={onChangeCuisine}
              placeholder="Cuisine"
            />
          </Col>
          <Col>
            <Form.Control
              value={location}
              onChange={onChangeLocation}
              placeholder="Location"
            />
          </Col>
          <Col>
            <Button variant="dark" type="submit">
              Search
            </Button>
          </Col>
        </Row>
        <Figure>
          <Figure.Caption>{resultText}</Figure.Caption>
          <Figure.Image width={171} height={180} alt="171x180" src={imageUrl} />
        </Figure>
      </Form>
    </div>
  );
};

export default Connoisseur;
