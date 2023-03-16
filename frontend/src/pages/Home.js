import { useContext, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import Navbar from "../components/Navbar";

import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/context";
import { checkWalletIsConnected } from "../services/checkWalletIsConencted";

export default function Home() {
  const { currentAccount, setCurrentAccount } = useContext(UserContext);
  const navigate = useNavigate();

  const connectWalletHandler = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      alert("Please Install Metamask");
    }
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts"
      });
      console.log("Found an account! address : ", accounts[0]);
      navigate("/MintNft");
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  };
  const connectWalletButton = () => {
    return (
      <Flex onClick={connectWalletHandler} className="Home-ConnectWallet">
        Connect Wallet
      </Flex>
    );
  };

  useEffect(() => {
    async function checkingForWalletConnection() {
      // You can await here
      const result = await checkWalletIsConnected();
      if (result.status) {
        setCurrentAccount(result.account);
        navigate("/MintNft");
      }
    }
    checkingForWalletConnection();
  }, [currentAccount]);

  return (
    <Flex className="Container">
      <Navbar />
      <Flex className="Home-Container">
        <Flex>{connectWalletButton()}</Flex>
      </Flex>
    </Flex>
  );
}
