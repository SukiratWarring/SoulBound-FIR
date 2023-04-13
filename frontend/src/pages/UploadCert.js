import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkWalletIsConnected } from "../services/checkWalletIsConencted";
import CertiNft from "../CertiNFT.sol/CertiNFT.json";
import axios from "axios";
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";

export default function UploadCert() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [degreePeriod, setDegreePeriod] = useState("");
  const [dateOfIssue, setDateOfIssue] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(selectedFile);
    } else {
      setFile(null);
      setPreviewUrl(null);
    }
  };

  const mintNft = async (CID) => {
    const uri = `https://gateway.pinata.cloud/ipfs/${CID}`;
    //calling the contract with ethers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(
      "0x938F54B97E213Ac9e6e55964be9C5592200E5d69",
      CertiNft.abi,
      signer
    );
    const tx = await contractInstance.safeMint(toAddress, uri, {
      gasLimit: 5000000
    });
    const receipt = await tx.wait();
    console.log("receipt", receipt);
  };

  const handleSubmit = () => {
    const dataPayload = {
      pinataOptions: {
        cidVersion: 1
      },
      pinataMetadata: {
        name: "Certificate",
        keyvalues: {
          customKey: "customValue",
          customKey2: "customValue2"
        }
      },
      pinataContent: {
        // description: "Proof of Education",
        image: file,
        name: `${name}`,
        attributes: [
          {
            trait_type: "Date of issue",
            value: `${dateOfIssue}`
          },
          {
            trait_type: "Name of the organisation",
            value: "SRMIST"
          },
          {
            trait_type: "Duration of the degree",
            value: `${degreePeriod}`
          }
        ]
      }
    };
    var config = {
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      headers: {
        pinata_api_key: "9d71ac4adfa281d78bee",
        pinata_secret_api_key:
          "ec3f84c6cc4c1433ec0bbe7318f41d6d6c2e668b9a97eb0f676349ef506bc48e",
        "Content-Type": "application/json"
      },
      data: dataPayload
    };
    axios(config)
      .then((res) => {
        console.log(res.data.IpfsHash);
        mintNft(res.data.IpfsHash);
      })
      .catch((err) => {
        console.log("err", err);
      });
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
      <Flex className="Upload-Container" pb="50px">
        <Flex className="Upload-Form">
          <FormControl>
            <Flex mb="20px">
              <Flex direction="column" mr="50px">
                <FormLabel>Enter Student name</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Flex>
              <Flex direction="column">
                <FormLabel>Enter Degree period. Eg. 2019-2023</FormLabel>
                <Input
                  type="text"
                  value={degreePeriod}
                  onChange={(e) => setDegreePeriod(e.target.value)}
                />
              </Flex>
            </Flex>
            <Flex>
              <Flex direction="column" mr="50px">
                <FormLabel>Enter Date of Issue: DD:MM:YY</FormLabel>
                <Input
                  type="text"
                  value={dateOfIssue}
                  onChange={(e) => setDateOfIssue(e.target.value)}
                />
              </Flex>
              <Flex direction="column">
                <FormLabel>Enter Wallet Address</FormLabel>
                <Input
                  type="text"
                  value={toAddress}
                  onChange={(e) => setToAddress(e.target.value)}
                />
              </Flex>
            </Flex>
          </FormControl>
        </Flex>
        <Flex className="Upload-Image">
          <input type="file" accept="image/*" onChange={handleFileUpload} />

          {previewUrl && (
            <Flex className="Upload-Preview">
              <img src={previewUrl} alt="Preview" />
            </Flex>
          )}

          {file && <p>Selected file: {file.name}</p>}
        </Flex>
        <Flex
          type="submit"
          className={`btn btn-primary ${!file ? "disabled" : ""}`}
          onClick={() => {
            if (file) {
              handleSubmit();
            }
          }}
        >
          Upload Certificate
        </Flex>
      </Flex>
    </Flex>
  );
}
