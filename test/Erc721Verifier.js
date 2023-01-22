const { expect } = require("chai");
// const { utils, BigNumber } = require("ethers");
const { ethers } = require("hardhat");

describe("Erc721Verifier", async () => {
  let owner;
  let add1;
  let add2;
  let ERC721Verifier;
  let erc721Verifier;
  let erc721VerifierAddress;
  //   before(async () => {
  [owner, add1, add2] = await ethers.getSigners();
  console.log("owner,add1,add2", owner.address, add1.address, add2.address);
  //deploying
  ERC721Verifier = await ethers.getContractFactory("Erc721Verifier");
  erc721Verifier = await ERC721Verifier.deploy("CertificateNft", "CNFT");
  await erc721Verifier.deployed();
  erc721VerifierAddress = erc721Verifier.address;
  console.log(verifierName, " tx hash:", erc721VerifierAddress);
  console.log("first", first);
  //   });
});
