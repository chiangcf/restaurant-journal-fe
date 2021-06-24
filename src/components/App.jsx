import "./css/App.css";
import Header from "./Header.jsx";
import Connoisseur from "./Connoisseur.jsx";
import Logger from "./Logger.jsx";

function App() {
  return (
    <div
      style={{
        backgroundColor: "#D9E5C1",
        height: "100vh", // this makes it full screen
      }}
    >
      <Header />
      <Connoisseur />
      <Logger />
    </div>
  );
}

export default App;
