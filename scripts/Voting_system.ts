import { ethers } from "hardhat";
import { Voting_system__factory } from "../typechain-types";

async function main() {


  const voting = await ethers.deployContract("Voting_sytem", [],)

  await voting.waitForDeployment();
  console.log('voting contract deployed to:', voting.target);


  const [signer1, signer2, signer3, signer4] =
    await ethers.getSigners();
    
  // const voting = await ethers.getContractAt(
  //   "IVoting",
  //   "0x4D7d531b2403a053CC7ea69d2e059E35Ad34fBcC"
  // );

//     await Voting_system__factory.setContract(45, "james", signer1.address);
//   //   const candidates = await votingApp.getCandidateData(signer1.address);

//   //   console.log(candidates);
//   //   console.log(signer2.address);
//   //   await votingApp.voterRight("drake", signer2.address);

//   //   await votingApp.connect(signer2).vote(signer1.address, 1);

//   const votersLength = await votingApp.getVoterLength();
//   console.log(votersLength);

//   const voterData = await votingApp.getVoterLength();
//   console.log(voterData);
}

// We recommend this pattern to be able to use async/await everywhere 0x5FbDB2315678afecb367f032d93F642f64180aa3
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
