const hre = require("hardhat");

async function main() {
  const SimpleBank = await hre.ethers.getContractFactory("SimpleBank");
  const bank = await SimpleBank.deploy();
  await bank.deployed();
  console.log("SimpleBank deployed to:", bank.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
