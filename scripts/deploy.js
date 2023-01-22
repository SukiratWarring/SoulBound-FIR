const hre = require("hardhat");

async function main() {
  const verifierContract = "ERC721Verifier";
  const verifierName = "ERC721Verifier";
  const verifierSymbol = "ERC721";
  const ERC721Verifier = await ethers.getContractFactory(verifierContract);
  const erc721Verifier = await ERC721Verifier.deploy(
    verifierName,
    verifierSymbol
  );

  await erc721Verifier.deployed();
  console.log(verifierName, " tx hash:", erc721Verifier.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
