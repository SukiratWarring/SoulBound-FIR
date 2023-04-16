import {
  Button,
  Flex,
  Card,
  Text,
  Heading,
  Box,
  Stack,
  CardBody,
  CardHeader,
  StackDivider,
  SimpleGrid,
} from "@chakra-ui/react";
import React, { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import { ethers } from "ethers";
import CertiNft from "../FirNFT_Logic_v2.sol/FirNFT_Logic.json";
import { LoaderContext } from "../context/loader";
function MyFir() {
  const [fetchedFirs, setfetchedFirs] = useState();
  const { setLoader } = useContext(LoaderContext);

  const fetchInfo = async () => {
    setLoader(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(
        "0xBc17E6D37e3C5a23358853F9938694929C2d9895",
        CertiNft.abi,
        signer
      );
      const signerAddress = await signer.getAddress();
      const complaintNos = Number(
        ethers.utils.formatEther(
          await contractInstance.indexOfAddress(signerAddress)
        )
      );
      const getLengthOfAddress = Number(
        await contractInstance.getLengthOfAddress(signerAddress)
      );
      const helperArr = [];
      for (let i = 0; i < getLengthOfAddress; i++) {
        const tx = await contractInstance.complaintNumberToComplaint(
          complaintNos,
          i
        );
        helperArr.push(tx);
      }
      console.log("helperArr", helperArr);
      setLoader(false);
      setfetchedFirs(helperArr);
    } catch (error) {
      setLoader(false);
    }
  };

  return (
    <Flex className="Container">
      <Navbar />
      <Flex justifyContent={"center"}>
        <Button onClick={fetchInfo}>Get your FIR info</Button>
      </Flex>
      <SimpleGrid minChildWidth="250px" spacing="50px" padding={20}>
        {fetchedFirs
          ? fetchedFirs.map((element) => {
              return (
                <Card>
                  <CardHeader>
                    <Heading size="md">Fir Number: {`${element[0]}`}</Heading>
                  </CardHeader>
                  <CardBody>
                    <Stack divider={<StackDivider />} spacing="4">
                      <Box>
                        <Heading size="xs" textTransform="uppercase">
                          Is the FIR resolved ?
                        </Heading>
                        <Text pt="2" fontSize="sm">
                          {element._status.toString()}
                        </Text>
                      </Box>
                      <Box>
                        <Heading size="xs" textTransform="uppercase">
                          Suspect
                        </Heading>
                        <Text pt="2" fontSize="sm">
                          {element.suspect}
                        </Text>
                      </Box>
                      <Box>
                        <Heading size="xs" textTransform="uppercase">
                          Description
                        </Heading>
                        <Text pt="2" fontSize="sm">
                          {element._description}
                        </Text>
                      </Box>
                    </Stack>
                  </CardBody>
                </Card>
              );
            })
          : ""}
      </SimpleGrid>
    </Flex>
  );
}

export default MyFir;
