// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

interface IERC20{
    function approve(address spender, uint256 value) external returns (bool);
     function transfer(address to, uint256 value) external returns (bool);
      function transferFrom(
    address from,
    address to,
    uint256 value
  )
    external
    returns (bool);

}