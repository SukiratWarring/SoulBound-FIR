import "./App.css";
import MintNft from "./pages/MintNft";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { FirebaseContext, UserContext } from "./context/context";
import { firebase } from "./lib/firebase.prod";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./pages/Home";
import RegisterFIR from "./pages/RegisterFIR";
function App() {
  const [currentAccount, setCurrentAccount] = useState(null);

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
