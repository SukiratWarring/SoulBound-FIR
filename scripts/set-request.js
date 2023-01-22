async function main() {
  const circuitId = "credentialAtomicQuerySig";

  const validatorAddress = "0xb1e86C4c687B85520eF4fd2a0d14e81970a15aFB";

  const schemaHash = "83d0ea68cc78f4a9378f6c5591fa32fc"; // extracted from PID Platform

  const schemaEnd = fromLittleEndian(hexToBytes(schemaHash));

  const query = {
    schema: ethers.BigNumber.from(schemaEnd),
    slotIndex: 2,
    operator: 1,
    value: [1, ...new Array(63).fill(0).map((i) => 0)],
    circuitId,
  };

  // add the address of the contract just deployed
  ERC721VerifierAddress = "0x8d3E51A384078694Bd4d0eCCa93ad287769eBdcf";

  let erc721Verifier = await hre.ethers.getContractAt(
    "Erc721Verifier",
    ERC721VerifierAddress
  );

  try {
    await erc721Verifier.setZKPRequest(1, validatorAddress, query);
    console.log("Request set");
  } catch (e) {
    console.log("error: ", e);
  }
}

function hexToBytes(hex) {
  for (var bytes = [], c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
  return bytes;
}

function fromLittleEndian(bytes) {
  const n256 = BigInt(256);
  let result = BigInt(0);
  let base = BigInt(1);
  bytes.forEach((byte) => {
    result += base * BigInt(byte);
    base = base * n256;
  });
  return result;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
