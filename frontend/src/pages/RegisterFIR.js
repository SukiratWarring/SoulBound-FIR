import { Flex, Input, Textarea, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { ethers } from "ethers";
import CertiNft from "../FirNFT_Logic_v2.sol/FirNFT_Logic.json";
import { checkWalletIsConnected } from "../services/checkWalletIsConencted";
import { useNavigate } from "react-router-dom";
import { LoaderContext } from "../context/loader";
import Receipt from "../components/InvoiceModal";
function RegisterFIR() {
  const navigate = useNavigate();
  const [by, setBy] = useState("");
  const [invoiceData, setinvoiceData] = useState("");
  const [suspect, setSuspect] = useState("");
  const [description, setDescription] = useState("");
  const [occurrenceDateTime, setOccurrenceDateTime] =
    useState("10:00-14/04/2023");
  const [registrationDateTime, setRegistrationDateTime] =
    useState("10:00-14/04/2023");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [occurrencePlace, setOccurrencePlace] = useState("");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const { setLoader } = useContext(LoaderContext);

  const handleOnSubmit = async () => {
    console.log("by,suspect,description", by, suspect, description);
    setLoader(true);
    try {
      const data = new FormData();
      console.log("image", image);
      data.append("file", image);
      data.append("upload_preset", "Sukirat");
      data.append("cloud_name", "dfzeoclda");
      fetch("https://api.cloudinary.com/v1_1/dfzeoclda/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then(async (data) => {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contractInstance = new ethers.Contract(
            "0xBc17E6D37e3C5a23358853F9938694929C2d9895",
            CertiNft.abi,
            signer
          );
          console.log("first", contractInstance);
          console.log(
            "process.env",
            process.env.REACT_APP_CERTINFT_CONTRACTADDRESS
          );
          const tx = await contractInstance.createComplaint(
            by,
            suspect,
            description,
            data.secure_url
          );
          const receipt = await tx.wait();
          console.log("receipt", receipt);
          setinvoiceData(receipt);
          onOpen();
          setLoader(false);
        })
        .catch((err) => {
          console.log("err", err);
        });
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };
  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setImage(selectedFile);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(selectedFile);
    } else {
      setImage(null);
      setPreviewUrl(null);
    }
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
                  color: "black",
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
                  color: "black",
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
                  color: "black",
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
                  color: "black",
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
                  color: "black",
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
                  color: "black",
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
            <Flex direction="column" mb="10px">
              <Flex>Associated and Relevant Image :</Flex>
              <Flex className="Upload-FIR-Image">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                />

                {previewUrl && (
                  <Flex className="Upload-FIR-Preview">
                    <img src={previewUrl} alt="Preview" />
                  </Flex>
                )}
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        <Flex
          type="submit"
          className={`btn btn-primary`}
          mb="50px"
          onClick={handleOnSubmit}
        >
          Generate FIR
        </Flex>
      </Flex>
      <Receipt invoiceData={invoiceData} isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
}

export default RegisterFIR;
