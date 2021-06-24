import React, { useRef, useState } from "react"; // important importation
import "./css/App.css";
import "./css/Logger.css";

// Make this pretty like a grid maybe?
// Possibly put an image inside span
const Logger = ({ rating, restaurantName, review, title }) => {
  const [name, setName] = useState("test");
  const [isInEditMode, setEditMode] = useState(false);
  const textInput = useRef();

  const changeEditMode = () => {
    setEditMode(isInEditMode ? false : true);
  };

  const updateComponentValue = () => {
    setEditMode(false);
    textInput.current.focus();
    console.log(textInput);
    setName(textInput.current.value);
  };

  const renderEditView = () => {
    return (
      <div>
        <input type="text" defaultValue={name} ref={textInput} />
        <button onClick={changeEditMode}>X</button>
        <button onClick={updateComponentValue}>OK</button>
      </div>
    );
  };

  const renderDefaultView = () => {
    return <div onDoubleClick={changeEditMode}>{name}</div>;
  };

  return isInEditMode ? renderEditView() : renderDefaultView();

  // <div class="plan">
  //   <h3>{restaurantName}</h3>
  //   <h4> {rating}/5</h4>

  //   <ul>
  //     <li>
  //       <b
  //         onDoubleClick={() => {
  //           console.log("sape");
  //         }}
  //       >
  //         {title}
  //       </b>
  //     </li>
  //     <li> {review}</li>
  //   </ul>
  // </div>
};

export default Logger;
