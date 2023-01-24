const hre = require("hardhat");

async function main() {
  const verifierContract = "Erc721Verifier";
  const verifierName = "CertificateNft";
  const verifierSymbol = "CNFT";
  const ERC721Verifier = await ethers.getContractFactory(verifierContract);
  const erc721Verifier = await ERC721Verifier.deploy(
    verifierName,
    verifierSymbol
  );

  await erc721Verifier.deployed();
  console.log("Deployed Address: ", erc721Verifier.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
