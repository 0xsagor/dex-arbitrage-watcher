# DEX Arbitrage Watcher

An expert-level monitoring tool for blockchain developers and quantitative traders. This repository provides a clean, robust framework to track price differences for ERC-20 pairs across multiple automated market makers (AMMs).

## Core Functionality
* **Real-time Monitoring**: Connects to Ethereum or Layer 2 nodes via WebSocket for instant price updates.
* **Price Calculation**: Uses the `getAmountsOut` constant product formula to determine potential trade outputs.
* **Profit Analysis**: Accounts for network gas fees and slippage to calculate net profit in real-time.

## Technical Requirements
* Node.js v18+
* Provider API Key (Alchemy, Infura, or QuickNode)
* Basic understanding of liquidity pools and x*y=k mechanics.

## Configuration
Update `settings.js` with your chosen RPC URL and the token pair addresses you wish to track (e.g., WETH/USDC).
