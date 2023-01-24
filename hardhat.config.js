require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("hardhat-contract-sizer");
require("@nomiclabs/hardhat-etherscan");

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
      url: process.env.REACT_APP_MUMBAI_URL || "",
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
