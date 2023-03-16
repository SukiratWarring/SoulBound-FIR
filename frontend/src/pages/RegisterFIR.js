import { Flex } from "@chakra-ui/react";
import React from "react";
import Navbar from "../components/Navbar";

function RegisterFIR() {
  return (
    <Flex className="Container">
      <Navbar />
      <Flex className="Home-Container">
        <Flex>Register FIR</Flex>
      </Flex>
    </Flex>
  );
}

export default RegisterFIR;
