// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const config = require("./config.json");

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function main() {

  const network = "mumbai"; // Possible values : mumbai or matic

  const LERC20 = await hre.ethers.getContractFactory("LERC20");
  const lERC20Instance = await LERC20.deploy(
    config[network].lotteryToken.name,
    config[network].lotteryToken.symbol,
    config[network].lotteryToken.decimals
  );

  await lERC20Instance.deployed();

  console.log("Lottery ERC20 deployed to:", lERC20Instance.address);
  await sleep(20000);

  await hre.run("verify:verify", {
    address: lERC20Instance.address,
    constructorArguments: [
      config[network].lotteryToken.name,
      config[network].lotteryToken.symbol,
      config[network].lotteryToken.decimals
    ],
  });

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
