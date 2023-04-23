import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { checkWalletIsConnected } from "../services/checkWalletIsConencted";
export default function Navbar() {
  const navigate = useNavigate();
  const [walletConnected, setWalletConnected] = useState(false);
  useEffect(() => {
    async function checkingForWalletConnection() {
      // You can await here
      const result = await checkWalletIsConnected();
      if (result.status) {
        setWalletConnected(true);
      }
    }
    checkingForWalletConnection();
  }, []);
  const location = useLocation();
  return (
    <Flex className="Navbar-Container">
      <Flex className="Navbar-Links">
        {!walletConnected && (
          <NavLink
            exact
            to="/"
            isActive={() => ["/", "/home"].includes(location.pathname)}
          >
            Home
          </NavLink>
        )}
        {walletConnected && (
          <NavLink
            exact
            to="/MintNft"
            isActive={() => ["/MintNft"].includes(location.pathname)}
            className="Navbar-Link"
          >
            Create Certificates
          </NavLink>
        )}
        {walletConnected && (
          <NavLink
            exact
            to="/FIR"
            isActive={() => ["/FIR"].includes(location.pathname)}
            className="Navbar-Link"
          >
            Register FIR
          </NavLink>
        )}
        {walletConnected && (
          <NavLink
            exact
            to="/MyFir"
            isActive={() => ["/MyFir"].includes(location.pathname)}
            className="Navbar-Link"
          >
            My-Fir
          </NavLink>
        )}
      </Flex>
    </Flex>
  );
}
