const express = require("express");
const {
  fetchPaginatedTransactions,
  fetchTransactionDetail,
} = require("./controllers/TransactionsController");
const router = express.Router();

router.get("/transactions", fetchPaginatedTransactions);
router.get("/transactionDetails", fetchTransactionDetail);
module.exports = router;
