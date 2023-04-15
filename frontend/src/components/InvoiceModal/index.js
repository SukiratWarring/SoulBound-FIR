import React from "react";
import {
  Button,
  ModalFooter,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Box,
  Heading,
  Text,
  VStack,
  Divider,
  Link,
} from "@chakra-ui/react";
import { ethers } from "ethers";
function Receipt({ invoiceData, isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent display={"flex"} justifyContent={"cener"}>
        <ModalBody>
          <Box borderWidth="10px" borderRadius="md" p={2} maxW="500px">
            <Heading as="h1" size="lg" textAlign="center">
              Receipt
            </Heading>
            <Divider my={4} />
            <VStack align="start" spacing={4}>
              <Text>
                <Text fontWeight="bold">Transaction Hash</Text>
                <Link
                  fontSize={11}
                  fontWeight="bold"
                  color={"blue"}
                  href={`https://sepolia.etherscan.io/tx/${invoiceData.transactionHash}`}
                >
                  {invoiceData.transactionHash}
                </Link>
              </Text>
              <Text>
                <Text fontWeight="bold">From:</Text> {invoiceData.from}
              </Text>
              <Text>
                <Text fontWeight="bold">To:</Text> {invoiceData.to}
              </Text>
              (
              <Text>
                <Text fontWeight="bold">Gas Details:</Text>
                <Box>
                  <Text>
                    Gas used :
                    {invoiceData
                      ? ethers.utils.formatEther(invoiceData.gasUsed.toString())
                      : ""}
                  </Text>
                  <Text>
                    Gas Price :
                    {invoiceData
                      ? ethers.utils.formatEther(
                          invoiceData.effectiveGasPrice.toString()
                        )
                      : ""}
                  </Text>
                </Box>
              </Text>
              )
              <Text>
                <Text fontWeight="bold">Total Gas Price($):</Text>
                {invoiceData
                  ? ethers.utils.formatEther(
                      invoiceData.gasUsed
                        .mul(invoiceData.effectiveGasPrice)
                        .toString()
                    )
                  : "loading..."}
              </Text>
            </VStack>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={onClose}
            justifyContent={"center"}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default Receipt;
