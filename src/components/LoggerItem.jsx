import React, { useRef, useState } from "react"; // important importation
import Button from "react-bootstrap/Button";
import postRestReviews from "./Helpers";
import "./css/App.css";
import "./css/Logger.css";

// Make this pretty like a grid maybe?
// Possibly put an image inside span
const Logger = ({ rating, restaurantName, review, title }) => {
  const [titleText, setTitleText] = useState(title);
  const [reviewText, setReviewText] = useState(review);
  const [ratingText, setRatingText] = useState(rating);
  const [reviewEditMode, setReviewEditMode] = useState(false);
  const [titleEditMode, setTitleEditMode] = useState(false);
  const [ratingEditMode, setRatingEditMode] = useState(false);
  const [submitButton, setSubmitButton] = useState(false);
  const reviewTextInput = useRef();
  const titleTextInput = useRef();
  const ratingTextInput = useRef();

  // Changes the view between default or Edit
  const changeReviewEditMode = () => {
    setReviewEditMode(reviewEditMode ? false : true);
    setSubmitButton(true);
  };

  // Updates the value of the reviewTextInput
  const updateReviewValue = () => {
    setReviewEditMode(false);
    reviewTextInput.current.focus();
    setReviewText(reviewTextInput.current.value);
  };

  // Renders the EditView for the Review
  const renderReviewEditView = () => {
    return (
      <div>
        <textarea type="text" defaultValue={reviewText} ref={reviewTextInput} />
        <button onClick={changeReviewEditMode}>X</button>
        <button onClick={updateReviewValue}>OK</button>
      </div>
    );
  };

  // Renders the DefaultView for the Review
  const renderReviewDefaultView = () => {
    return <div onDoubleClick={changeReviewEditMode}>{reviewText}</div>;
  };

  // Changes the view between default or Title
  const changeTitleEditMode = () => {
    setTitleEditMode(titleEditMode ? false : true);
    setSubmitButton(true);
  };

  // Updates the value of the titleTextInput
  const updateTitleValue = () => {
    setTitleEditMode(false);
    titleTextInput.current.focus();
    setTitleText(titleTextInput.current.value);
  };

  // Renders the TitleView for the Review
  const renderTitleEditView = () => {
    return (
      <div>
        <input type="text" defaultValue={titleText} ref={titleTextInput} />
        <button onClick={changeTitleEditMode}>X</button>
        <button onClick={updateTitleValue}>OK</button>
      </div>
    );
  };

  // Renders the DefaultView for the Review
  const renderTitleDefaultView = () => {
    return (
      <div>
        <b onDoubleClick={changeTitleEditMode}>{titleText}</b>
      </div>
    );
  };

  // RATINGS
  // Changes the view between default or Edit
  const changeRatingEditMode = () => {
    setRatingEditMode(ratingEditMode ? false : true);
    setSubmitButton(true);
  };

  // Updates the value of the ratingTextInput
  const updateRatingValue = () => {
    setRatingEditMode(false);
    ratingTextInput.current.focus();
    setRatingText(ratingTextInput.current.value);
  };

  // Renders the EditView for the Rating
  const renderRatingEditView = () => {
    return (
      <div>
        <textarea type="text" defaultValue={ratingText} ref={ratingTextInput} />
        <button onClick={changeRatingEditMode}>X</button>
        <button onClick={updateRatingValue}>OK</button>
      </div>
    );
  };

  // Renders the DefaultView for the Rating
  const renderRatingDefaultView = () => {
    return <div onDoubleClick={changeRatingEditMode}>{ratingText}/5</div>;
  };

  const showSubmitButton = () => {
    if (submitButton) {
      return (
        <li>
          <Button
            variant="secondary"
            onClick={() =>
              postRestReviews(ratingText, restaurantName, titleText, reviewText)
            }
            size="sm"
          >
            submit
          </Button>
        </li>
      );
    }
  };

  return (
    <div className="plan">
      <h3>{restaurantName}</h3>
      <h4>
        {ratingEditMode ? renderRatingEditView() : renderRatingDefaultView()}
      </h4>

      <ul>
        <li>
          {titleEditMode ? renderTitleEditView() : renderTitleDefaultView()}
          {/* {returnTT()} */}
        </li>
        <li style={{ fontSize: 13 }}>
          {reviewEditMode ? renderReviewEditView() : renderReviewDefaultView()}
        </li>
        {showSubmitButton()}
      </ul>
    </div>
  );
};

export default Logger;
