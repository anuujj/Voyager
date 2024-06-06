const https = require("https");
const axios = require("axios");
const TransactionDetailsModel = require("./models/TransactionDetails");

// Function to fetch data from external API and save to MongoDB
let prev_block;

const fetchBlockDetails = async (latest_block) => {
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
  return result;
};
const fetchDataAndSaveTransactions = async () => {
  try {
    const response = await axios.post(
      "https://starknet-mainnet.blastapi.io/ff9368e6-04c8-4b23-acd1-8750d2d31832/rpc/v0_7",
      {
        jsonrpc: "2.0",
        method: "starknet_blockNumber",
        params: [],
        id: 1,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Connection: "keep-alive",
        },
      }
    );
    const data = response.data;
    const latest_block = data.result;

    if (!prev_block && latest_block) {
      prev_block = latest_block;
      for (let i = 0; i >= 0; i--) {
        // limited the loop due to rate-limiting issues
        const result = await fetchBlockDetails(latest_block - i);
        await fetchAllTransactionDetailsAndSave(result);
      }
    } else if (latest_block !== prev_block) {
      console.log("new block", latest_block);
      prev_block = latest_block;
      const result = await fetchBlockDetails(latest_block);
      await fetchAllTransactionDetailsAndSave(result);
    } else {
      console.log("No new block", latest_block, prev_block);
    }
  } catch (err) {
    console.error("Error fetching data from API or saving to MongoDB", err);
  }
};

const fetchAllTransactionDetailsAndSave = async (block) => {
  const response = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd",
    {
      headers: {
        "Content-Type": "application/json",
        Connection: "keep-alive",
      },
    }
  );
  const ethPrice = response.data.ethereum.usd;

  for (let index = 0; index < block.transactions.length; index++) {
    //delay to prevent rate-limiting issues
    await new Promise((resolve) => setTimeout(resolve, 200));
    await fetchTransactionDetailsAndSave(index, block, ethPrice);
  }
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
        },
        {
          headers: {
            "Content-Type": "application/json",
            Connection: "keep-alive",
          },
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
