import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  return (
    <Flex className="Navbar-Container">
      <Flex className="Navbar-Links">
        {!walletConnected && (
          <Flex
            className="Navbar-Link"
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </Flex>
        )}
        {walletConnected && (
          <Flex
            className="Navbar-Link"
            onClick={() => {
              navigate("/MintNft");
            }}
          >
            Create Certificates
          </Flex>
        )}
        {walletConnected && (
          <Flex
            className="Navbar-Link"
            onClick={() => {
              navigate("/FIR");
            }}
          >
            Register FIR
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
