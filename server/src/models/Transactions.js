const mongoose = require('mongoose');

const TransactionsSchema = new mongoose.Schema({
  status: { type: String, required: true },
  hash: { type: String, required: true },
  type: { type: String, required: true },
  block: { type: Number, required: true },
  age: { type: Number, required: true },
  version : { type: String, required: true },
});

const TransactionsModel = mongoose.model('Transactions', TransactionsSchema);

module.exports = TransactionsModel;
