require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
require("@openzeppelin/hardhat-upgrades");
require("hardhat-gas-reporter");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-contract-sizer");
module.exports = {
  solidity: "0.8.9",
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
        process.env.REACT_APP_WALLET_KEY !== undefined
          ? [process.env.REACT_APP_WALLET_KEY]
          : [],
    },
    mumbai: {
      url: process.env.REACT_APP_MUMBAI_URL || "",
      accounts:
        process.env.REACT_APP_WALLET_KEY !== undefined
          ? [process.env.REACT_APP_WALLET_KEY]
          : [],
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: process.env.REACT_APP_POLYGONSCAN_API_KEY,
    },
  },
};
