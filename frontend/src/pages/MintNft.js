import { React, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  Flex,
  Image,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from "@chakra-ui/react";
import { checkWalletIsConnected } from "../services/checkWalletIsConencted";
import { useNavigate } from "react-router-dom";
import uniLogo from "../assets/comapnyLogo.png";
import certLogo from "../assets/img_473965.png";
import html2canvas from "html2canvas";
import { firebase } from "../lib/firebase.prod";

function MintNft() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [degreePeriod, setDegreePeriod] = useState("");
  const [dateOfIssue, setDateOfIssue] = useState("");
  const [toAddress, setToAddress] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const element = document.getElementById("print"),
      canvas = await html2canvas(element),
      data = canvas.toDataURL("image/jpg"),
      link = document.createElement("a");

    link.href = data;
    link.download = "downloaded-image.jpg";
    // link.click();

    canvas.toBlob((response) => {
      const storageRef = firebase
        .storage()
        .ref(`/files/${name}-${toAddress.substring(0, 5)}-Degree`);
      storageRef.put(response).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((url) => {
          console.log(
            "Cert url",
            "https://testnets.opensea.io/assets/mumbai/0x938f54b97e213ac9e6e55964be9c5592200e5d69/2"
          );
        });
      });
    });
  };
  const handleName = (e) => setName(e.target.value);

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
            <Tab>Certificate</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Flex
                className="Mint-Cert-Cont"
                backgroundImage={`linear-gradient(black, black),${uniLogo}`}
                id="print"
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
                        color: "black"
                      }}
                      variant="unstyled"
                      placeholder="Enter Student name"
                      value={name}
                      onChange={handleName}
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
                        color: "black"
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
                        color: "black"
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
                        color: "black"
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
                id="print"
              >
                <Flex className="Mint-Cert">
                  <Flex className="Mint-Cert-Image">
                    <Image
                      src={certLogo}
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
                    The certifying authority of
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
                        color: "black"
                      }}
                      variant="unstyled"
                      placeholder="Enter Student name"
                      value={name}
                      onChange={handleName}
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
                        color: "black"
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
                    has been awarded the certificate of
                  </Flex>
                  <Flex
                    className="Mint-Cert-Description"
                    fontWeight={"600"}
                    fontSize="28px"
                  >
                    Full stack development workshop
                  </Flex>
                  <Flex className="Mint-Cert-Description" fontSize="28px">
                    on
                  </Flex>
                  <Flex className="Mint-Cert-Input" my="10px">
                    <Input
                      color="black"
                      _placeholder={{
                        color: "black"
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
                    having successfully completed during the time
                  </Flex>
                  <Flex className="Mint-Cert-Input" my="10px">
                    <Input
                      color="black"
                      _placeholder={{
                        color: "black"
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
          Create and Download Certificate
        </Flex>
      </Flex>
    </Flex>
  );
}

export default MintNft;
