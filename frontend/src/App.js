import "./App.css";
import Upload from "./pages/Upload";
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
      <Upload />
    </div>
  );
}

export default App;
