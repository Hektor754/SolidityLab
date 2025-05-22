const hre = require("hardhat");

async function main() {
  const Quotes = await hre.ethers.getContractFactory("Inspirational_Quotes");

  const quotes = await Quotes.deploy();

  console.log("Contract deployed to:", await quotes.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
