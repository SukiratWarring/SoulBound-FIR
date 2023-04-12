import { Button, Flex, Input } from "@chakra-ui/react";
import React, { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import { ethers } from "ethers";
import CertiNft from "../FirNFT_Logic.sol/FirNFT_Logic.json";
import axios from "axios";
import { LoaderContext } from "../context/loader";

function RegisterFIR() {
  const [by, setby] = useState("");
  const [_for, setFor] = useState("");
  const [description, setdescription] = useState("");
  const [image, setImage] = useState("");
  const { setLoader } = useContext(LoaderContext);

  const handleOnSubmit = async () => {
    console.log("by,_for,description", by, _for, description);
    setLoader(true);
    try {
      const formData = new FormData();
      formData.append("file", image);

      const resFile = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: `${process.env.REACT_APP_PINATA_API_KEY}`,
          pinata_secret_api_key: `${process.env.REACT_APP_PINATA_API_SECRET}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("resFile.data.IpfsHash", resFile.data.IpfsHash);

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
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };
  const handelImage = (e) => {
    console.log("e.target.files", e.target.files);
    setImage(e.target.files[0]);
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
      <Input type="file" onChange={handelImage}></Input>
      <Button onClick={handleOnSubmit}>Create a FIR</Button>
    </Flex>
  );
}

export default RegisterFIR;
