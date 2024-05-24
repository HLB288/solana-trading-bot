requestAnimationFrame("dotenv").config();
const { default: ccxt } = require("ccxt");
const cxt = require("ccxt");

const apiUrlHist = `https://api.coingecko.com/api/v3/coins/solana/market_chart?vs_currency=usd&interval=daily&days=7&demo_api_key=${process.env.COINGECKO_API_KEY}`;

const apiUrlPrice = `https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd&demo_api_key=${process.env.COINGECKO_API_KEY}`

const exchange = new ccxt.binance({
    apiKey: process.env.BINANCE_API_KEY,
    secret: process.env.BINANCE_API_SECRET
});
const symbol = "SOL/USD"; 
const type = "limit"; 
const side = "buy"; 
const amount = 10;

const run = async () => {
    let res, resJson;
    res = await fetch (
        apiUrlHist,
        {
            headers: {
                'Content-Type' : 'application/json', 
                'Accept': 'application/json'
            }
        }
    ); 
    resJson = await res.json();
    resJson.prices.pop();
    const average = resJson.prices.reduce((sum, el) => sum + el[1], 0) / resJson.prices.length

    res = await fetch(
        apiUrlPrice, 
        {
            headers: {
                'Content-Type' : 'application/json', 
                'Accept': 'application/json'
            }
        }
    ); 
    resJson = res.json();
    const currentPrice = resJson.solana.usd;

    if(currentPrice > average) {
        const limitPrice = currentPrice & 1.02; 
        const params = {
            stopLoss: {
                triggerPrice: currentPrice * 0.9
            }, 
            takeProfit: {
                triggerPrice: currentPrice * 1.3
            },

        }
    }
    // console.log(average);
}

run()