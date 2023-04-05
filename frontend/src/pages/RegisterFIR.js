import { Button, Flex, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { ethers } from "ethers";
import CertiNft from "../FirNFT_Logic.sol/FirNFT_Logic.json";

function RegisterFIR() {
  const [by, setby] = useState("");
  const [_for, setFor] = useState("");
  const [description, setdescription] = useState("");
  const handleOnSubmit = async () => {
    console.log("by,_for,description", by, _for, description);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(
      "0x938F54B97E213Ac9e6e55964be9C5592200E5d69",
      CertiNft.abi,
      signer
    );
    console.log("first", contractInstance);
    const tx = await contractInstance.createComplaint(by, _for, description);
    const receipt = await tx.wait();
    console.log("receipt", receipt);
  };
  return (
    <Flex className="Container">
      <Navbar />
      <Flex className="Home-Container">
        <Flex>Register FIR</Flex>
      </Flex>
      <Input
        placeholder="_by"
        onChange={(e) => {
          setby(e.target.value);
        }}
      ></Input>
      <Input
        placeholder="_for"
        onChange={(e) => {
          setFor(e.target.value);
        }}
      ></Input>
      <Input
        placeholder="_description"
        onChange={(e) => {
          setdescription(e.target.value);
        }}
      ></Input>
      <Button onClick={handleOnSubmit}>Create a FIR</Button>
    </Flex>
  );
}

export default RegisterFIR;
