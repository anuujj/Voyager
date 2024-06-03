const express = require("express");
const {
  fetchPaginatedTransactions,
} = require("./controllers/TransactionsController");
const router = express.Router();

router.get("/transactions", fetchPaginatedTransactions);
module.exports = router;
