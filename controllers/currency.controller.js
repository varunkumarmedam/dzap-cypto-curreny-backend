const axios = require('axios');

const coinsListUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=300&page=1";
const supportingCurrenciesUrl = "https://api.coingecko.com/api/v3/simple/supported_vs_currencies";
const priceUrl = "https://api.coingecko.com/api/v3/simple/price";

module.exports = class CurrencyController {
    async list(req, res) {
        try {
            const coinsListPromise = axios.get(coinsListUrl);
            const supportingCurrenciesPromise = axios.get(supportingCurrenciesUrl);

            const data = await Promise.all([coinsListPromise, supportingCurrenciesPromise]);

            const currencyData = data[0].data.map((coin) => {
                return {
                    id: coin.id,
                    name: coin.name,
                    symbol: coin.symbol,
                    logo: coin.image
                }
            });

            res.send({ coins: currencyData, currencies: data[1].data });
        } catch (error) {
            res.status(401).send({
                message: error.message,
                status: "Failed to fetch coins data"
            });
        }
    }

    async convertor(req, res) {
        try {
            const crypto_id = req.query.id;
            const amount = req.query.amount;
            const currency = req.query.currency;
            if (!crypto_id)
                throw new Error("Please provide a valid Crypto Currency Id");
            if (amount == undefined || amount === 0)
                throw new Error("Please provide some crypto amount");
            if (!currency)
                throw new Error("Please provide a valid Currency");

            const eachCoinPrice = await axios.get(`${priceUrl}?ids=${crypto_id}&vs_currencies=${currency}`);
            const coinPrice = eachCoinPrice.data[crypto_id][currency] * amount;

            res.status(200).send({
                price: coinPrice
            })

        } catch (error) {
            res.status(401).send({
                message: error.message,
                status: "Something went wrong in crypto currency conversion"
            })
        }

    }
};