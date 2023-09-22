// Import the required modules
const crypto = require('crypto');
require('dotenv').config(); // Load environment variables from a .env file

/**
 * Fetch the current price of a given trading symbol.
 * @param {*} symbol - The trading symbol (e.g., 'BTCUSDT').
 * @returns {number} - The current price of the symbol.
 */
async function getTickerPrice(symbol){
    try{
        // Fetch price data from the Binance API
        const priceFetch = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
        const priceBody = await priceFetch.json();
        return parseFloat(priceBody.price); // Parse and return the price as a floating-point number
    }catch(error){
        console.error('Error',error); // Log any errors that occur during the fetch operation
        throw error; // Rethrow the error to be handled elsewhere, if necessary
    }
}

/**
 * Execute a trading action (buy or sell) for a given trading symbol.
 * @param {*} symbol - The trading symbol (e.g., 'BTCUSDT').
 * @param {number} price - The price at which to execute the trade.
 * @param {string} action - The trading action ('BUY' or 'SELL').
 * @param {number} quantity - The quantity of the asset to buy or sell.
 * @returns {object} - The response from the trading API.
 */
async function makeTrade(symbol, price, action, quantity){
    try{
        // Load API credentials from environment variables
        const apiKey = process.env.BINANCE_API_KEY;
        const apiSecret = process.env.BINANCE_API_SECRET;

        // Define the API endpoint and timestamp
        const endpoint = 'https://api.binance.com/api/v3/order';
        const timestamp = Date.now();

        // Define the trading parameters
        const params= {
            symbol,
            side: action,
            type: 'LIMIT',
            quantity,
            price,
            timestamp,
            timeInForce: 'GTC'
        };

        // Create a query string from the trading parameters
        let queryString = Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`).join('&');

        // Create a signature using HMAC-SHA256 with the API secret
        const signature = crypto.createHmac('sha256', apiSecret)
            .update(queryString)
            .digest('hex');

        // Append the signature to the query string
        queryString += '&signature=' + signature;

        // Construct the final URL for the trading request
        const url = endpoint + '?' + queryString;

        // Send a POST request to execute the trade
        const request = await fetch(url, {
            method: 'POST',
            headers: {
                'X-MBX-APIKEY': apiKey,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        // Parse and return the response from the trading API
        const response = await request.json();
        return response;

    }catch(error){
        console.error('Error', error); // Log any errors that occur during the trade execution
    }
}

// An immediately invoked async function to execute a trading transaction
(async () => {
    const symbol = 'SHIBUSDT'; // The trading symbol for the transaction
    const price = await getTickerPrice(symbol); // Fetch the current price of the symbol
    const action = 'SELL'; // The trading action (e.g., 'SELL')
    const quantity = Math.round(5 / price); // Calculate the quantity of the asset to sell based on a target value
    const transaction = await makeTrade(symbol, price, action, quantity); // Execute the trade
    console.log(transaction); // Log the response from the trade execution
})();
