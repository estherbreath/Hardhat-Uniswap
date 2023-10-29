import { ethers } from "hardhat";

async function main() {
  const votingApp = await ethers.deployContract("Voting", []);

  await votingApp.waitForDeployment();

  console.log(votingApp.target);
}

// We recommend this pattern to be able to use async/await everywhere 0x5FbDB2315678afecb367f032d93F642f64180aa3
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});