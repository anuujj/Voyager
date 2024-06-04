const mongoose = require("mongoose");

const TransactionDetailsSchema = new mongoose.Schema({
  hash: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, required: true },
  block: { type: Number, required: true },
  timeStamp: { type: Number, required: true },
  actualFee: { type: Object, required: true },
  maxFee: { type: String, required: true },
  l1GasPrice: { type: String, required: true },
  sender: { type: String, required: true },
  nonce: { type: String, required: true },
  position: { type: Number, required: true },
  version: { type: String, required: true },
  executionResources: { type: Object, required: true },
  callData: { type: Object, required: true },
  signature: { type: Object, required: true },
  events: { type: Object, required: true },
});

const TransactionDetailsModel = mongoose.model(
  "TransactionDetails",
  TransactionDetailsSchema
);

module.exports = TransactionDetailsModel;
