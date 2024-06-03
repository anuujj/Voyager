import { REVERTED, TRANSACTION_TYPES } from "../constants/transactions";
import "../styles/transactions.css";
import {
  convertUnixTimestampToDateString,
  convertUnixTimestampToTimeAgo,
  ellipsis,
} from "../utils";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const TransactionRow = ({
  status,
  hash,
  type,
  block,
  age,
}: {
  status: string;
  hash: string;
  type: string;
  block: number;
  age: number;
}) => {
  const transactionType = TRANSACTION_TYPES.find((t) => t.key === type);
  return (
    <div className="transaction-row">
      <div>
        <Tooltip anchorSelect={`#transaction-status-${hash}`}>{status}</Tooltip>
        <span id={`transaction-status-${hash}`}>
          {status?.toLowerCase() === REVERTED ? "❌" : "✅"}
        </span>
      </div>
      <div>
        <Tooltip anchorSelect={`#transaction-hash-${hash}`}>{hash}</Tooltip>
        <span id={`transaction-hash-${hash}`} className="color-blue">
          {ellipsis(hash)}{" "}
        </span>
        <button>
          <img
            src="images/copy_to_clipboard.svg"
            alt="copy to clipboard"
            className="copy-icon"
            onClick={() => navigator.clipboard.writeText(hash)}
          />
        </button>
      </div>
      <div style={transactionType?.style} className="transaction-type">
        {type}
      </div>
      <div>
        <span className="color-blue">{block} </span>
        <button>
          <img
            src="images/copy_to_clipboard.svg"
            alt="copy to clipboard"
            className="copy-icon"
            onClick={() => navigator.clipboard.writeText(block.toString())}
          />
        </button>
      </div>
      <div>
        <Tooltip anchorSelect={`#transaction-age-${hash}`}>
          {convertUnixTimestampToDateString(age)}
        </Tooltip>
        <span id={`transaction-age-${hash}`}>
          {convertUnixTimestampToTimeAgo(age)}
        </span>
      </div>
    </div>
  );
};
export default TransactionRow;
