import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { ethers } from "ethers";
import CertiNft from "../FirNFT_Logic.sol/FirNFT_Logic.json";
import { checkWalletIsConnected } from "../services/checkWalletIsConencted";
import { useNavigate } from "react-router-dom";

function RegisterFIR() {
  const navigate = useNavigate();
  const [by, setBy] = useState("");
  const [suspect, setSuspect] = useState("");
  const [description, setDescription] = useState("");
  const [occurrenceDateTime, setOccurrenceDateTime] =
    useState("10:00-14/04/2023");
  const [registrationDateTime, setRegistrationDateTime] =
    useState("10:00-14/04/2023");

  const [occurrencePlace, setOccurrencePlace] = useState("");
  const handleOnSubmit = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(
      "0x938F54B97E213Ac9e6e55964be9C5592200E5d69",
      CertiNft.abi,
      signer
    );
    console.log("first", contractInstance);
    const tx = await contractInstance.createComplaint(by, suspect, description);
    console.log("tx", tx);
  };

  useEffect(() => {
    async function checkingForWalletConnection() {
      const result = await checkWalletIsConnected();
      if (!result.status) {
        navigate("/");
      }
    }
    checkingForWalletConnection();
  }, []);
  return (
    <Flex className="Container">
      <Navbar />
      <Flex className="Home-Container">
        <Flex mb="20px" fontSize="36px">
          Register F.I.R.
        </Flex>
        <Flex className="FIR-Box">
          <Flex direction="column" align="center">
            <Flex>FORM No. XX.XX(X)</Flex>
            <Flex fontWeight="600" mb="10px">
              FIRST INFORMATION REPORT (F.I.R.)
            </Flex>
            <Flex mb="20px">
              First Information of a cognizable crime under Section X, Criminal
              PenalCode
            </Flex>
          </Flex>

          <Flex direction="column">
            <Flex>
              Police Station Guduvancheri District Chengalpattu No. H2
            </Flex>

            <Flex align="center" mb="10px">
              <Flex mr="10px">Date and Hour of F.I.R. registration:</Flex>
              <Input
                color="black"
                _placeholder={{
                  color: "black"
                }}
                placeholder="Enter in format : mm:HH-DD/MM/YYYY"
                variant="flushed"
                w="300px"
                type="text"
                fontWeight="600"
                value={registrationDateTime}
                onChange={(e) => {
                  setRegistrationDateTime(e.target.value);
                }}
              />
            </Flex>
            <Flex align="center" mb="10px">
              <Flex mr="10px">Date and Hour of Occurrence :</Flex>
              <Input
                color="black"
                _placeholder={{
                  color: "black"
                }}
                placeholder="Enter in format : mm:HH-DD/MM/YYYY"
                variant="flushed"
                w="300px"
                type="text"
                fontWeight="600"
                value={occurrenceDateTime}
                onChange={(e) => {
                  setOccurrenceDateTime(e.target.value);
                }}
              />
            </Flex>
            <Flex align="center" mb="10px">
              <Flex mr="10px">Name of Complainant :</Flex>
              <Input
                color="black"
                _placeholder={{
                  color: "black"
                }}
                placeholder="Enter Complainant name"
                variant="flushed"
                w="300px"
                type="text"
                fontWeight="600"
                value={by}
                onChange={(e) => {
                  setBy(e.target.value);
                }}
              />
            </Flex>
            <Flex align="center" mb="10px">
              <Flex mr="10px">Place of occurrence :</Flex>
              <Input
                color="black"
                _placeholder={{
                  color: "black"
                }}
                placeholder="Enter place of occurrence"
                variant="flushed"
                w="300px"
                type="text"
                fontWeight="600"
                value={occurrencePlace}
                onChange={(e) => {
                  setOccurrencePlace(e.target.value);
                }}
              />
            </Flex>
            <Flex align="center " mb="10px">
              <Flex mr="10px">Name of suspect :</Flex>
              <Input
                color="black"
                _placeholder={{
                  color: "black"
                }}
                placeholder="Enter name of suspect"
                variant="flushed"
                w="300px"
                type="text"
                fontWeight="600"
                value={suspect}
                onChange={(e) => setSuspect(e.target.value)}
              />
            </Flex>
            <Flex direction="column" mb="10px">
              <Flex>Description of offense :</Flex>
              <Textarea
                color="black"
                _placeholder={{
                  color: "black"
                }}
                placeholder="Enter Full Description of the Offense"
                variant="filled"
                w="500px"
                type="text"
                fontWeight="600"
                value={description}
                size="md"
                rows="10"
                resize="none"
                onChange={(e) => setDescription(e.target.value)}
              />
            </Flex>
          </Flex>
        </Flex>

        <Button mb="50px" onClick={handleOnSubmit}>
          Generate FIR
        </Button>
      </Flex>
    </Flex>
  );
}

export default RegisterFIR;
