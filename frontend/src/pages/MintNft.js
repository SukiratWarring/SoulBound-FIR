import { React, useState } from "react";
import axios from "axios";
import { ethers } from "ethers";
import CertiNft from "../CertiNFT.sol/CertiNFT.json";
function MintNft() {
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
    console.log(
      "Name,imageUrl,degreePeriod,dateOfIssue,toAddress",
      name,
      imageUrl,
      degreePeriod,
      dateOfIssue,
      toAddress
    );
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
        image:
          "https://gateway.pinata.cloud/ipfs/QmZ6iJbUpEfKxUodwx4DgaF9zquvRjJEMXAkH8EJtWPLKm",
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
    console.log(
      "process.env.REACT_APP_PINATA_API_KEY",
      process.env.REACT_APP_PINATA_API_KEY
    );
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

    const res = await axios(config).catch((err) => {
      console.log("err", err);
    });
    console.log(res.data.IpfsHash);
    mintNft(res.data.IpfsHash);
  };
  const handelName = (e) => setName(e.target.value);
  const handleImageUrl = (e) => setImageUrl(e.target.value);
  return (
    <div className="p-5">
      <form
        className="d-flex justify-content-center row g-3"
        onSubmit={handleOnSubmit}
      >
        <div className="col-md-5 flex">
          <label for="studentName" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="studentName"
            placeholder="enter student name .."
            onChange={handelName}
          />
        </div>
        <div className="col-md-5 flex">
          <label for="toAddress" className="form-label">
            To Address :
          </label>
          <input
            type="text"
            className="form-control"
            id="studentName"
            placeholder="0x7e21312123b1s3d..."
            onChange={(e) => setToAddress(e.target.value)}
          />
        </div>
        <div className="col-10">
          <label for="imputImageUrl" className="form-label">
            Image Url
          </label>
          <input
            type="text"
            className="form-control"
            id="imputImageUrl"
            placeholder="https://pinata.com/..."
            onChange={handleImageUrl}
          />
        </div>
        <div className="col-md-6">
          <label for="degreePeriod" className="form-label">
            Degree Period
          </label>
          <input
            type="text"
            className="form-control"
            id="degreePeriod"
            placeholder="eg. 2019-23"
            onChange={(e) => setDegreePeriod(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label for="inputState" className="form-label">
            Date of issue
          </label>
          <input
            placeholder="DD:MM:YYY"
            className="form-control"
            onChange={(e) => setDateOfIssue(e.target.value)}
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}

export default MintNft;
