import React, { useState } from "react"; // important importation
import "./css/App.css";
import "./css/Logger.css";
import { Input, Button } from "reactstrap";

// This is React Hooks
const Connoisseur = (props) => {
  const [resultText, setResultText] = useState("");
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
        console.log(restaurant);
        const recommendation = `You should try ${restaurant["name"]} which is located in ${restaurant["location"]["address1"]}`;
        setResultText(recommendation); // Sets the text to the name of the restaurant
      })
      .catch((err) => console.log(err));
  };

  return (
    <div id="pricing-table">
      <form onSubmit={handleSubmit}>
        <div className="side-by-side">
          <Input
            className="w-25"
            type="search"
            name="searchCuisine"
            placeholder="Cuisine"
            value={cuisine}
            onChange={onChangeCuisine}
          />

          <Input
            style={{ marginLeft: "1rem" }}
            className="w-25"
            type="search"
            name="searchLocation"
            placeholder="City, State"
            value={location}
            onChange={onChangeLocation}
          />
          <Button style={{ marginLeft: "1rem" }} color="primary">
            Search
          </Button>
        </div>
      </form>
      <p style={{ marginLeft: "1rem" }} id="resultsBlock">
        {resultText}
      </p>
    </div>
  );
};

export default Connoisseur;
