import {ethers} from "hardhat";

async function main() {
 
    const uniswapAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
    const uniswapV2 = await ethers.getContractAt("IUniswap", uniswapAddress)
  
    const uniToken = "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984"
    const UNI = await ethers.getContractAt("IERC20", uniToken)
  
    const WETHAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
    const holder = "0x20bB82F2Db6FF52b42c60cE79cDE4C7094Ce133F"
  
    const impersonter = await ethers.getImpersonatedSigner(holder)
  
    const WETH = await ethers.getContractAt("IERC20", WETHAddress)
  
    const uniAmountDesired = ethers.parseEther("10")
    const amountuniMin = ethers.parseEther("0")
    const amountETHMin = ethers.parseEther("0")
    const to ="0x77aC3a62c12333DD9604f8D5cD6E350Cd33D04b4"
    const currentTimestampInSeconds = Math.round(Date.now() / 100)
    const deadline = currentTimestampInSeconds + 86400
    const value = ethers.parseEther("0.2")
  
    await UNI.connect(impersonter).approve(uniswapV2, ethers.parseEther("200"))

    await uniswapV2.connect(impersonter).addLiquidityETH(uniToken, uniAmountDesired, amountuniMin, amountETHMin, to, deadline, {value: value})
    
    
    





}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });