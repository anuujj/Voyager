import "../styles/transactions.css";
const TransactionRow = ({ status, hash, type, operations, block, age }) => {
  return (
    <div className="transaction-row">
      <div>{status}</div>
      <div>{hash}</div>
      <div>{type}</div>
      <div>{operations}</div>
      <div>{block}</div>
      <div>{age}</div>
    </div>
  );
};
export default TransactionRow;
