import "./App.css";
import MintNft from "./pages/MintNft";
import { Router, Route } from "react-router-dom";
function App() {
  const handleConnect = async () => {
    if (typeof window.ethereum !== "undefined") {
      /* eslint-disable no-undef */
      await ethereum.request({ method: "eth_requestAccounts" });
    } else {
      console.log("Download MetaMask in the browser!");
    }
  };
  return (
    <Router>
      <div className="App">
        <nav className="navbar bg-light">
          <div className="container-fluid ">
            <a className="navbar-brand">⚒️Major Project</a>
            <button
              className="btn btn-outline-success p"
              type="submit"
              onClick={handleConnect}
            >
              Connect
            </button>
          </div>
        </nav>
        <Route path="/MintNft" element={<MintNft />} />
      </div>
    </Router>
  );
}

export default App;
