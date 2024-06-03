const https = require("https");
const axios = require("axios");
const TransactionsModel = require("./models/Transactions");
// const Item = require("./models");

// Function to fetch data from external API and save to MongoDB
let prev_block;
const httpsAgentBlockVerification = new https.Agent({
  rejectUnauthorized: false,
});
const fetchDataAndSaveTransactions = async () => {
  try {
    axios.defaults.httpsAgent = httpsAgentBlockVerification;
    const response = await axios.post(
      "https://starknet-mainnet.blastapi.io/ff9368e6-04c8-4b23-acd1-8750d2d31832/rpc/v0_7",
      {
        jsonrpc: "2.0",
        method: "starknet_blockNumber",
        params: [],
        id: 1,
      },
      { httpsAgent: httpsAgentBlockVerification }
    );
    const data = response.data;
    const latest_block = data.result;

    if (latest_block !== prev_block) {
      const res = await axios.post(
        "https://starknet-mainnet.blastapi.io/ff9368e6-04c8-4b23-acd1-8750d2d31832/rpc/v0_7",
        {
          jsonrpc: "2.0",
          method: "starknet_getBlockWithTxs",
          params: [
            {
              block_number: 643101,
            },
          ],
          id: 1,
        },
        { httpsAgent: httpsAgentBlockVerification }
      );
      const data = res.data;
      const result = data.result;

      const transactions = result.transactions.map(tx => ({
        status: result.status,
        hash: tx.transaction_hash,
        type: tx.type,
        block: result.block_number,
        age: result.timestamp,
      }));
      // await TransactionsModel.insertMany(transactions);
    }
    console.log("Data fetched and saved to MongoDB");
  } catch (err) {
    console.error("Error fetching data from API or saving to MongoDB", err);
  }
};

// Polling function
const startPolling = () => {
  console.log("polling");
  fetchDataAndSaveTransactions(); // Initial fetch
  setInterval(fetchDataAndSaveTransactions, 3000000); // Poll every 30 seconds
};

module.exports = { startPolling };
