import { ethers } from "hardhat";

async function main() {
  const [signer1, signer2, signer3, signer4, signer5] =
    await ethers.getSigners();
  const votingApp = await ethers.getContractAt(
    "IVoting",
    "0x4D7d531b2403a053CC7ea69d2e059E35Ad34fBcC"
  );

  await votingApp.setCandidate(45, "james", signer2.address);
  const candidates = await votingApp.getCandidateData(signer2.address);

  console.log(candidates);
  const candidatesLength = await votingApp.getCandidateLength();

  console.log(candidatesLength);

  await votingApp.voterRight("drake", signer4.address);

  await votingApp.connect(signer4).vote(signer2.address, 2);

  const votersLength = await votingApp.getVoterLength();
  console.log(votersLength);

  const voterData = await votingApp.getVoterLength();
  console.log(voterData);

  await votingApp.voterRight("mark", signer5.address);

  await votingApp.connect(signer5).vote(signer2.address, 2);

  const candidatesLength2 = await votingApp.getCandidateLength();

  console.log(candidatesLength2);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});