require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
    solidity: "0.8.19",
    networks: {
        // Sepolia con RPC público gratuito
        sepolia: {
            url: "https://ethereum-sepolia-rpc.publicnode.com",
            accounts: [process.env.PRIVATE_KEY],
            chainId: 11155111
        },
        // Hardhat local para pruebas
        hardhat: {
            chainId: 31337
        }
    },
};
