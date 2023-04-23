const hre = require("hardhat");

async function main() {
  const verifierContract = "FirNFT_Logic_v2";

  const ERC721Verifier = await ethers.getContractFactory(verifierContract);
  const erc721Verifier = await ERC721Verifier.deploy();
  await erc721Verifier.deployed();
  console.log("Deployed Address: ", erc721Verifier.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
