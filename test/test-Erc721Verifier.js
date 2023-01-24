const { expect } = require("chai");
const { utils, BigNumber } = require("ethers");
const { ethers } = require("hardhat");

describe("Erc721Verifier", () => {
  let owner;
  let add1;
  let add2;
  let ERC721Verifier;
  let hardhatErc721Verifier;
  before(async () => {
    [owner, add1, add2] = await ethers.getSigners();
    console.log("owner,add1,add2", owner.address, add1.address, add2.address);
    //deploying
    ERC721Verifier = await ethers.getContractFactory("Erc721Verifier");
    hardhatErc721Verifier = await ERC721Verifier.deploy(
      "CertificateNft",
      "CNFT"
    );
    console.log("hardhatErc721Verifier Address", hardhatErc721Verifier.address);
  });
  it("Checking the initial condition", async () => {});
});
