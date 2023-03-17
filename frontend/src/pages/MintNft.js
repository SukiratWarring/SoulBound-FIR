import { React, useEffect, useState } from "react";
import axios from "axios";
import { ethers } from "ethers";
import CertiNft from "../CertiNFT.sol/CertiNFT.json";
import Navbar from "../components/Navbar";
import {
  Flex,
  Image,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { checkWalletIsConnected } from "../services/checkWalletIsConencted";
import { useNavigate } from "react-router-dom";
import uniLogo from "../assets/comapnyLogo.png";
import html2canvas from "html2canvas";
import { getStorage, ref } from "firebase/storage";
import { firebase } from "../lib/firebase.prod";

function MintNft() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [degreePeriod, setDegreePeriod] = useState("");
  const [dateOfIssue, setDateOfIssue] = useState("");
  const [toAddress, setToAddress] = useState("");
  const mintNft = async (CID) => {
    const uri = `https://gateway.pinata.cloud/ipfs/${CID}`;
    console.log(
      "process.env.REACT_APP_CERTINFT_CONTRACTADDRESS",
      process.env.REACT_APP_CERTINFT_CONTRACTADDRESS
    );
    //calling the contract with ethers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(
      process.env.REACT_APP_CERTINFT_CONTRACTADDRESS,
      CertiNft.abi,
      signer
    );
    const tx = await contractInstance.safeMint(toAddress, uri);
    const receipt = await tx.wait();
    console.log("receipt", receipt);
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const element = document.getElementById("print1"),
      canvas = await html2canvas(element),
      data = canvas.toDataURL("image/jpg"),
      link = document.createElement("a");

    link.href = data;
    link.download = "downloaded-image.jpg";
    canvas.toBlob((response) => {
      const storageRef = firebase
        .storage()
        .ref(`/files/${name}-${toAddress.substring(0, 5)}-Degree`);
      storageRef.put(response).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((url) => {
          setImageUrl(url);
          console.log("url", url);
          const data = {
            pinataOptions: {
              cidVersion: 1,
            },
            pinataMetadata: {
              name: "Certificate",
              keyvalues: {
                customKey: "customValue",
                customKey2: "customValue2",
              },
            },
            pinataContent: {
              // description: "Proof of Education",
              image: url,
              name: `${name}`,
              attributes: [
                {
                  trait_type: "Date of issue",
                  value: `${dateOfIssue}`,
                },
                {
                  trait_type: "Name of the organisation",
                  value: "SRMIST",
                },
                {
                  trait_type: "Duration of the degree",
                  value: `${degreePeriod}`,
                },
              ],
            },
          };
          var config = {
            method: "post",
            url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
            headers: {
              pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
              pinata_secret_api_key: process.env.REACT_APP_PINATA_API_SECRET,
              "Content-Type": "application/json",
            },
            data: data,
          };

          axios(config)
            .then((res) => {
              console.log(res.data.IpfsHash);
              mintNft(res.data.IpfsHash);
            })
            .catch((err) => {
              console.log("err", err);
            });
        });
      });
    });
  };
  const handelName = (e) => setName(e.target.value);

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
      <Flex className="Mint-Container" pb="50px">
        <Tabs isFitted w="80%" variant="enclosed">
          <TabList>
            <Tab>College Degree</Tab>
            <Tab>Certificates</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Flex
                className="Mint-Cert-Cont"
                backgroundImage={`linear-gradient(black, black),${uniLogo}`}
                id="print1"
              >
                <Flex className="Mint-Cert">
                  <Flex className="Mint-Cert-Image">
                    <Image
                      src={uniLogo}
                      alt="University"
                      height="100%"
                      width="100%"
                    />
                  </Flex>
                  <Flex
                    className="Mint-Cert-Description"
                    fontSize="28px"
                    fontWeight={"600"}
                  >
                    Faculty of Engineering and Technology
                  </Flex>
                  <Flex className="Mint-Cert-Description" fontSize="28px">
                    The Board of Management of the example university
                  </Flex>
                  <Flex className="Mint-Cert-Description" fontSize="28px">
                    hereby makes it known that the student
                  </Flex>
                  <Flex className="Mint-Cert-Input" my="10px">
                    <Input
                      color="black"
                      _placeholder={{
                        color: "black",
                      }}
                      variant="unstyled"
                      placeholder="Enter Student name"
                      value={name}
                      onChange={handelName}
                      textAlign={"center"}
                      fontWeight={"600"}
                      width="500px"
                    />
                  </Flex>
                  <Flex className="Mint-Cert-Description" fontSize="28px">
                    (Issued to the wallet address)
                  </Flex>
                  <Flex className="Mint-Cert-Input" my="10px">
                    <Input
                      color="black"
                      _placeholder={{
                        color: "black",
                      }}
                      variant="unstyled"
                      placeholder="Enter Address"
                      value={toAddress}
                      onChange={(e) => setToAddress(e.target.value)}
                      textAlign={"center"}
                      fontWeight={"600"}
                      width="500px"
                    />
                  </Flex>
                  <Flex className="Mint-Cert-Description" fontSize="28px">
                    has been awarded the degree of
                  </Flex>
                  <Flex
                    className="Mint-Cert-Description"
                    fontWeight={"600"}
                    fontSize="28px"
                  >
                    B.Tech in Computer Science Engineering
                  </Flex>
                  <Flex className="Mint-Cert-Description" fontSize="28px">
                    on
                  </Flex>
                  <Flex className="Mint-Cert-Input" my="10px">
                    <Input
                      color="black"
                      _placeholder={{
                        color: "black",
                      }}
                      variant="unstyled"
                      placeholder="Enter Date of Issue: DD:MM:YY"
                      textAlign={"center"}
                      fontWeight={"600"}
                      value={dateOfIssue}
                      onChange={(e) => setDateOfIssue(e.target.value)}
                      width="500px"
                    />
                  </Flex>
                  <Flex className="Mint-Cert-Description" fontSize="28px">
                    having successfully completed during the years
                  </Flex>
                  <Flex className="Mint-Cert-Input" my="10px">
                    <Input
                      color="black"
                      _placeholder={{
                        color: "black",
                      }}
                      variant="unstyled"
                      placeholder="Degree period. Eg. 2019-2023"
                      value={degreePeriod}
                      onChange={(e) => setDegreePeriod(e.target.value)}
                      textAlign={"center"}
                      fontWeight={"600"}
                      width="500px"
                    />
                  </Flex>
                </Flex>
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex
                className="Mint-Cert-Cont"
                backgroundImage={`linear-gradient(black, black),${uniLogo}`}
                id="print2"
              >
                <Flex className="Mint-Cert">
                  <Flex className="Mint-Cert-Image">
                    <Image
                      src={uniLogo}
                      alt="University"
                      height="100%"
                      width="100%"
                    />
                  </Flex>
                  <Flex
                    className="Mint-Cert-Description"
                    fontSize="28px"
                    fontWeight={"600"}
                  >
                    Faculty of Engineering and Technology
                  </Flex>
                  <Flex className="Mint-Cert-Description" fontSize="28px">
                    The Board of Management of the example university
                  </Flex>
                  <Flex className="Mint-Cert-Description" fontSize="28px">
                    hereby makes it known that the student
                  </Flex>
                  <Flex className="Mint-Cert-Input" my="10px">
                    <Input
                      color="black"
                      _placeholder={{
                        color: "black",
                      }}
                      variant="unstyled"
                      placeholder="Enter Student name"
                      value={name}
                      onChange={handelName}
                      textAlign={"center"}
                      fontWeight={"600"}
                      width="500px"
                    />
                  </Flex>
                  <Flex className="Mint-Cert-Description" fontSize="28px">
                    (Issued to the wallet address)
                  </Flex>
                  <Flex className="Mint-Cert-Input" my="10px">
                    <Input
                      color="black"
                      _placeholder={{
                        color: "black",
                      }}
                      variant="unstyled"
                      placeholder="Enter Address"
                      value={toAddress}
                      onChange={(e) => setToAddress(e.target.value)}
                      textAlign={"center"}
                      fontWeight={"600"}
                      width="500px"
                    />
                  </Flex>
                  <Flex className="Mint-Cert-Description" fontSize="28px">
                    has been awarded the degree of
                  </Flex>
                  <Flex
                    className="Mint-Cert-Description"
                    fontWeight={"600"}
                    fontSize="28px"
                  >
                    B.Tech in Computer Science Engineering
                  </Flex>
                  <Flex className="Mint-Cert-Description" fontSize="28px">
                    on
                  </Flex>
                  <Flex className="Mint-Cert-Input" my="10px">
                    <Input
                      color="black"
                      _placeholder={{
                        color: "black",
                      }}
                      variant="unstyled"
                      placeholder="Enter Date of Issue: DD:MM:YY"
                      textAlign={"center"}
                      fontWeight={"600"}
                      value={dateOfIssue}
                      onChange={(e) => setDateOfIssue(e.target.value)}
                      width="500px"
                    />
                  </Flex>
                  <Flex className="Mint-Cert-Description" fontSize="28px">
                    having successfully completed during the years
                  </Flex>
                  <Flex className="Mint-Cert-Input" my="10px">
                    <Input
                      color="black"
                      _placeholder={{
                        color: "black",
                      }}
                      variant="unstyled"
                      placeholder="Degree period. Eg. 2019-2023"
                      value={degreePeriod}
                      onChange={(e) => setDegreePeriod(e.target.value)}
                      textAlign={"center"}
                      fontWeight={"600"}
                      width="500px"
                    />
                  </Flex>
                </Flex>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>

        <Flex
          type="submit"
          className="btn btn-primary"
          mt="50px"
          onClick={handleOnSubmit}
        >
          Create and Send Certificate
        </Flex>
      </Flex>
    </Flex>
  );
}

export default MintNft;
