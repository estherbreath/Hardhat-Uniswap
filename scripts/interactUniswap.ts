import { ethers, network } from "hardhat";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const deadline = currentTimestampInSeconds + 86400;

  const uniswapAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

  const uniswap = await ethers.getContractAt("IUniswap", uniswapAddress);

  const uniswapFactoryAddress = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";

  const uniswapFactory = await ethers.getContractAt(
    "IUniswapV2Factory",
    uniswapFactoryAddress
  );

  const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
  const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  const USDCContract = await ethers.getContractAt("IERC20", USDC);
  const DAIContract = await ethers.getContractAt("IERC20", DAI);

  const UsdcDaiHolder = "0x20bB82F2Db6FF52b42c60cE79cDE4C7094Ce133F";
  const UsdcDaiSigner = await ethers.getImpersonatedSigner(UsdcDaiHolder);

  //Uniswap parameters
  const amountADesired = ethers.parseEther("2");
  const amountBDesired = ethers.parseEther("2");
  const amountRADesired = ethers.parseEther("0");
  const amountRBDesired = ethers.parseEther("0");
  const amountAMin = ethers.parseEther("0");
  const amountBMin = ethers.parseEther("0");
  const amountETHMin = ethers.parseEther("1");
  const AmountETHinMax = ethers.parseEther("10");

  await network.provider.send("hardhat_setBalance", [
    UsdcDaiHolder,
    "0x5FDBB2BFAEE375E47C64C00000",
  ]);

  const approveUsdcToken = await USDCContract.connect(UsdcDaiSigner).approve(
    uniswapAddress,
    ethers.parseEther("10")
  );
  const approveDaiToken = await DAIContract.connect(UsdcDaiSigner).approve(
    uniswapAddress,
    ethers.parseEther("10")
  );

  await Promise.all([approveUsdcToken.wait(), approveDaiToken.wait()]);

  const to = "0xd8500DA651A2e472AD870cDf76B5756F9c113257";

  console.log(await USDCContract.balanceOf(to));

  console.log(
    `USDC Balance before ${ethers.formatUnits(
      await USDCContract.balanceOf(UsdcDaiHolder),
      6
    )})`
  );

  console.log(
    `Dai Balance before ${ethers.formatEther(
      await DAIContract.balanceOf(UsdcDaiHolder)
    )})`
  );

  const addLiqiudity = await uniswap
    .connect(UsdcDaiSigner)
    .addLiquidity(
      USDC,
      DAI,
      amountADesired,
      amountBDesired,
      amountAMin,
      amountBMin,
      UsdcDaiHolder,
      deadline
    );

  await addLiqiudity.wait();

  console.log("Transaction hash:", addLiqiudity.hash);

  const liquidityPairAddress = await uniswapFactory
    .connect(UsdcDaiSigner)
    .getPair(USDC, DAI);
  const pairContract = await ethers.getContractAt(
    "IERC20",
    liquidityPairAddress
  );

  const pairLiquidity = await pairContract.balanceOf(UsdcDaiSigner);

  console.log(liquidityPairAddress);
  console.log(pairContract);
  console.log(pairLiquidity);

  const approveLiquidity = await pairContract
    .connect(UsdcDaiSigner)
    .approve(uniswapAddress, pairLiquidity);

  await Promise.all([approveLiquidity.wait()]);

  console.log(approveLiquidity);

  const removeLiqiudity = await uniswap
    .connect(UsdcDaiSigner)
    .removeLiquidity(
      USDC,
      DAI,
      pairLiquidity,
      amountRADesired,
      amountRBDesired,
      UsdcDaiHolder,
      deadline
    );

  await removeLiqiudity.wait();

  console.log(
    `USDC Balance after ${ethers.formatUnits(
      await USDCContract.balanceOf(UsdcDaiHolder),
      6
    )})`
  );

  console.log(
    `Dai Balance after ${ethers.formatEther(
      await DAIContract.balanceOf(UsdcDaiHolder)
    )})`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});