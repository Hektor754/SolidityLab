const hre = require("hardhat");

async function main() {
  const CalculatorFactory = await hre.ethers.getContractFactory("Calculator");

  const calculator = await CalculatorFactory.deploy();
  await calculator.waitForDeployment();

  console.log("✅ Calculator deployed to:", await calculator.getAddress());

  await (await calculator.add(10)).wait();
  console.log("🧮 Added 10");

  await (await calculator.multiply(2)).wait();
  console.log("✖️ Multiplied by 2");

  await (await calculator.subtract(5)).wait();
  console.log("➖ Subtracted 5");

  const result = await calculator.get();
  console.log("📊 Final result:", result.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});