const TransactionDetails = require("../models/TransactionDetails");

const fetchPaginatedTransactions = async (req, res) => {
  const { id, size, filter } = req.query;
  try {
    let query = {};
    if (id) {
      query._id = { $lt: id };
    }
    if (filter) {
      query.type = filter;
    }

    const transactions = await TransactionDetails.find(query)
      .sort({ _id: -1 })
      .limit(parseInt(size));

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

const fetchTransactionDetail = async (req, res) => {
  const { hash } = req.query;
  try {
    const transactionDetail = await TransactionDetails.findOne({ hash });
    if (!transactionDetail) {
      return res.status(404).json({ error: "Transaction detail not found" });
    }
    res.status(200).json(transactionDetail);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transaction detail" });
  }
};

module.exports = {
  fetchPaginatedTransactions,
  fetchTransactionDetail,
};
