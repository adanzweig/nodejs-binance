# Binance Trading Bot

## Overview

This Node.js package provides a simple Binance trading bot that can fetch the current price of a trading symbol and execute trading actions like buying or selling based on certain conditions. It utilizes the Binance API for price data retrieval and trading execution.

## Prerequisites

Before using this package, make sure you have the following:

- Node.js installed on your system.
- A Binance API Key and API Secret. You can obtain these from your Binance account.

## Installation

1. Clone this repository or download the source code to your local machine.
2. Navigate to the project directory in your terminal.
3. Install the required dependencies using npm:

   ```
   npm install
   ```

## Configuration

Before running the trading bot, you need to configure your Binance API Key and API Secret. You can do this by creating a `.env` file in the project directory and adding the following lines:

```env
BINANCE_API_KEY=your_api_key_here
BINANCE_API_SECRET=your_api_secret_here
```

Replace `your_api_key_here` and `your_api_secret_here` with your actual Binance API credentials.

## Usage

You can use this package by importing the `getTickerPrice` and `makeTrade` functions into your own Node.js application.

### Fetching Ticker Price

To fetch the current price of a trading symbol, use the `getTickerPrice` function as follows:

```javascript
const symbol = 'BTCUSDT'; // Replace with the trading symbol you want to fetch the price for
const price = await getTickerPrice(symbol);
console.log(`Current ${symbol} Price: $${price}`);
```

### Making a Trade

To execute a trading action (buy or sell) for a trading symbol, use the `makeTrade` function:

```javascript
const symbol = 'BTCUSDT'; // Replace with the trading symbol you want to trade
const price = 50000; // Replace with your desired trade price
const action = 'BUY'; // 'BUY' to buy or 'SELL' to sell
const quantity = 0.1; // Replace with the quantity you want to buy or sell

try {
    const transaction = await makeTrade(symbol, price, action, quantity);
    console.log('Trade Executed:', transaction);
} catch (error) {
    console.error('Error:', error);
}
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

Please use this trading bot responsibly. Trading cryptocurrencies involves risks, and the bot's functionality may result in financial losses. Make sure to thoroughly test and understand the bot's behavior in a safe environment before using it with real funds. The developers of this package are not responsible for any losses incurred through the use of this software.