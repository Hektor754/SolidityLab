const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const CalculatorFactory = await hre.ethers.getContractFactory("Calculator");

  // Deploy the contract
  const calculator = await CalculatorFactory.deploy();
  await calculator.waitForDeployment(); // ✅ use waitForDeployment() instead of deployed()

  console.log("✅ Calculator deployed to:", await calculator.getAddress());

  // Interact with the contract
  await (await calculator.add(10)).wait();
  console.log("🧮 Added 10");

  await (await calculator.multiply(2)).wait();
  console.log("✖️ Multiplied by 2");

  await (await calculator.subtract(5)).wait();
  console.log("➖ Subtracted 5");

  const result = await calculator.get();
  console.log("📊 Final result:", result.toString()); // Expected: 15
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});