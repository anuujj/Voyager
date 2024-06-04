const https = require("https");
const axios = require("axios");
const TransactionsModel = require("./models/Transactions");
const TransactionDetailsModel = require("./models/TransactionDetails");

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
      }
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
              block_number: latest_block,
            },
          ],
          id: 1,
        }
      );
      const data = res.data;
      const result = data.result;

      const transactions = result.transactions.map((tx) => {
        return {
          status: result.status,
          hash: tx.transaction_hash,
          type: tx.type,
          block: result.block_number,
          age: result.timestamp,
        };
      });
      await TransactionsModel.insertMany(transactions);
      fetchAllTransactionDetailsAndSave(result);
    }
    console.log("Data fetched and saved to MongoDB");
  } catch (err) {
    console.error("Error fetching data from API or saving to MongoDB", err);
  }
};

const fetchAllTransactionDetailsAndSave = async (block) => {
  const promises = block.transactions.map((_, index) => fetchTransactionDetailsAndSave(index, block));
  await Promise.all(promises);
};

const fetchTransactionDetailsAndSave = async (txn_index, block) => {
  const transaction = block.transactions[txn_index];
  try {
    const res = await axios.post(
      "https://starknet-mainnet.blastapi.io/ff9368e6-04c8-4b23-acd1-8750d2d31832/rpc/v0_7",
      {
        jsonrpc: "2.0",
        method: "starknet_getTransactionReceipt",
        params: [transaction.transaction_hash],
        id: 1,
      }
    );
    const data = res.data;
    const result = data.result;
    const transactionDetails = {
      hash: transaction.transaction_hash,
      type: transaction.type,
      status: block.status,
      block: block.block_number,
      timeStamp: block.timestamp,
      actualFee: result.actual_fee,
      maxFee: transaction.max_fee,
      l1GasPrice: block.l1_gas_price.price_in_wei,
      sender: transaction.sender_address,
      nonce: transaction.nonce,
      position: txn_index,
      version: transaction.version,
      executionResources: result.execution_resources,
      callData: transaction.calldata,
      signature: transaction.signature,
      events: result.events,
    };
    console.log("===details", transactionDetails);
    await TransactionDetailsModel.create(transactionDetails);
    console.log("Transaction saved to MongoDB");
  } catch (err) {
    console.error(
      "Error fetching transaction details from API or saving to MongoDB",
      err
    );
  }
};

// Polling function
const startPolling = () => {
  console.log("polling");
  fetchDataAndSaveTransactions(); // Initial fetch
  setInterval(fetchDataAndSaveTransactions, 3000000); // Poll every 30 seconds
};

module.exports = { startPolling };
