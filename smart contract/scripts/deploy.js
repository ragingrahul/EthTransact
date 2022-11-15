const {ethers} = require("hardhat")

async function main() {
    const transactions=await ethers.getContractFactory("Transactions")
    const deployedTransactions=await transactions.deploy()

    await deployedTransactions.deployed()

    console.log("Transaction Contracts Address:",deployedTransactions.address)
}

const runMain=async()=>{
    try {
        await main()
        process.exit(0)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

runMain()