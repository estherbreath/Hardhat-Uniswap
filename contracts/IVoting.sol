// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface IVoting {
    function setCandidate(uint _age,string memory _name,address _candidateAddress) external;
    function getCandidates() external view returns (address[] memory);
    function getCandidateData(address _candidateAddress) external view returns (uint,string memory,uint,uint,address);
    function getCandidateLength() external view returns (uint);
    function voterRight(string memory name,address voterAddress) external;
    function vote(address _candidateAddress,uint _candidateVoteId) external;
    function getVoterLength() external view returns (uint);
    function getVoterData(address _candidateAddress) external view returns (uint,string memory,address,uint,uint,bool);
}