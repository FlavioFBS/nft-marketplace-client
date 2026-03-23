require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

// Debug: verificar que las variables se cargan
console.log("INFURA_SEPOLIA_RPC:", process.env.NEXT_PUBLIC_INFURA_SEPOLIA_RPC);
console.log("PRIVATE_KEY exists:", !!process.env.PRIVATE_KEY);

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: process.env.NEXT_PUBLIC_INFURA_SEPOLIA_RPC || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 11155111,
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
