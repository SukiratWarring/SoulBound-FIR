import "./App.css";
import MintNft from "./pages/MintNft";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoaderContext } from "./context/loader";
import { useState } from "react";
import { FirebaseContext, UserContext } from "./context/context";
import { firebase } from "./lib/firebase.prod";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./pages/Home";
import RegisterFIR from "./pages/RegisterFIR";
import Spinner from "./components/Loader";

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [loader, setLoader] = useState(false);

  return (
    <div className="App">
      {loader && <Spinner />}
      <LoaderContext.Provider value={{ loader, setLoader }}>
        <FirebaseContext.Provider value={{ firebase }}>
          <UserContext.Provider value={{ currentAccount, setCurrentAccount }}>
            <ChakraProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/MintNft" element={<MintNft />} />
                  <Route path="/FIR" element={<RegisterFIR />} />
                </Routes>
              </BrowserRouter>
            </ChakraProvider>
          </UserContext.Provider>
        </FirebaseContext.Provider>
      </LoaderContext.Provider>
    </div>
  );
}

export default App;
