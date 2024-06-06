export type Transaction = {
  _id: string
  hash: string;
  type: string;
  status: string;
  block: number;
  timeStamp: number;
  actualFee: any;
  ethPrice: number;
  maxFee: string;
  l1GasPrice: string;
  sender: string;
  nonce: string;
  position: number;
  version: string;
  executionResources: any;
  callData: any;
  signature: any;
  events: any;
};
