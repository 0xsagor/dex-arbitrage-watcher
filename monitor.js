const { ethers } = require("ethers");
const config = require("./settings");

const ABI = [
    "function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)"
];

async function checkArbitrage() {
    const provider = new ethers.WebSocketProvider(config.RPC_URL);
    
    const uniRouter = new ethers.Contract(config.UNISWAP_ROUTER, ABI, provider);
    const sushiRouter = new ethers.Contract(config.SUSHISWAP_ROUTER, ABI, provider);

    const amountIn = ethers.parseEther(config.TRADE_AMOUNT);
    const path = [config.WETH, config.USDC];

    console.log(`Monitoring ${config.TRADE_AMOUNT} WETH for arbitrage opportunities...`);

    provider.on("block", async (blockNumber) => {
        try {
            const [uniAmounts, sushiAmounts] = await Promise.all([
                uniRouter.getAmountsOut(amountIn, path),
                sushiRouter.getAmountsOut(amountIn, path)
            ]);

            const uniPrice = ethers.formatUnits(uniAmounts[1], 6);
            const sushiPrice = ethers.formatUnits(sushiAmounts[1], 6);

            console.log(`Block: ${blockNumber} | Uni: $${uniPrice} | Sushi: $${sushiPrice}`);

            const diff = Math.abs(uniPrice - sushiPrice);
            if (diff > 5) { // Simple $5 spread threshold
                console.log(`[!] OPPORTUNITY FOUND: $${diff.toFixed(2)} spread`);
            }
        } catch (error) {
            console.error("Error fetching prices:", error.message);
        }
    });
}

checkArbitrage();
