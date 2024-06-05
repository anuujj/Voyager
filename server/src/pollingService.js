const https = require("https");
const axios = require("axios");
const TransactionsModel = require("./models/Transactions");
const TransactionDetailsModel = require("./models/TransactionDetails");

// Function to fetch data from external API and save to MongoDB
let prev_block;
const httpsAgentBlockVerification = new https.Agent({
  rejectUnauthorized: false,
});

const fetchBlockDetailsAndSave = async (latest_block) => {
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
      version: tx.version,
    };
  });
  await TransactionsModel.insertMany(transactions);
  return result;
};
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

    if (!prev_block && latest_block) {
      prev_block = latest_block;
      for (let i = 0; i >= 0; i--) { // limited the loop due to rate-limiting issues
        const result = await fetchBlockDetailsAndSave(latest_block - i);
        await fetchAllTransactionDetailsAndSave(result);
      }
    } else if (latest_block !== prev_block) {
      prev_block = latest_block;
      const result = await fetchBlockDetailsAndSave(latest_block);
      await fetchAllTransactionDetailsAndSave(result);
    }else{
      console.log('No new block', latest_block, prev_block);
    }
    console.log("Data fetched and saved to MongoDB");
  } catch (err) {
    console.error("Error fetching data from API or saving to MongoDB", err);
  }
};

const fetchAllTransactionDetailsAndSave = async (block) => {
  const response = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
  );
  const ethPrice = response.data.ethereum.usd;
  const promises = block.transactions.map((_, index) =>
    fetchTransactionDetailsAndSave(index, block, ethPrice)
  );
  await Promise.all(promises);
};

const fetchTransactionDetailsAndSave = async (txn_index, block, ethPrice) => {
  const transaction = block.transactions[txn_index];
  if (transaction.type === "INVOKE" && transaction.version === "0x1") {
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
        ethPrice: ethPrice,
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
      await TransactionDetailsModel.create(transactionDetails);
      console.log("Transaction saved to MongoDB");
    } catch (err) {
      console.error(
        "Error fetching transaction details from API or saving to MongoDB",
        err
      );
    }
  }
  return;
};

// Polling function
const startPolling = () => {
  console.log("polling");
  fetchDataAndSaveTransactions(); // Initial fetch
  setInterval(fetchDataAndSaveTransactions, 30000); // Poll every 30 seconds
};

module.exports = { startPolling };
