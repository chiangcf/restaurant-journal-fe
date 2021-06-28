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
  const [reviewEditMode, setReviewEditMode] = useState(false);
  const [titleEditMode, setTitleEditMode] = useState(false);
  const [submitButton, setSubmitButton] = useState(false);
  const reviewTextInput = useRef();
  const titleTextInput = useRef();

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

  const showSubmitButton = () => {
    if (submitButton) {
      return (
        <li>
          <Button
            variant="secondary"
            onClick={() =>
              postRestReviews(rating, restaurantName, titleText, reviewText)
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
      <h4> {rating}/5</h4>

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
