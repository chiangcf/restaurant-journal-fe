import "./css/App.css";
import Header from "./Header.jsx";
import Connoisseur from "./Connoisseur.jsx";
import Logger from "./Logger.jsx";

function App() {
  return (
    <div className="container">
      <Header />
      <div className="break"> </div>
      <Connoisseur />
      <div className="break"> </div>
      <Logger />
    </div>
  );
}

export default App;
