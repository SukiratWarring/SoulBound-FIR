require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
require("@openzeppelin/hardhat-upgrades");
require("hardhat-gas-reporter");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-contract-sizer");
module.exports = {
  solidity: "0.8.9",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
  gasReporter: {
    currency: "USD",
    gasPrice: 10,
    enabled: process.env.GAS_REPORTER !== undefined ? true : false,
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: false,
    only: [],
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
    },
    goerli: {
      url: process.env.GOERLI_URL || "",
      accounts:
        process.env.Wallet_key !== undefined ? [process.env.Wallet_key] : [],
    },
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts:
        process.env.Wallet_key !== undefined ? [process.env.Wallet_key] : [],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
