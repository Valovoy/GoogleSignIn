import { useGoogleSignIn } from "./useGoogleSignIn";
import "./App.css";

const App = () => {
  useGoogleSignIn();

  return (
    <div className="App">
      <div id="buttonDiv" />
    </div>
  );
};

export default App;
