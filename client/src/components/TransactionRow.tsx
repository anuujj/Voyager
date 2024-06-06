import { Link } from "react-router-dom";
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
  timeStamp,
  version,
}: {
  status: string;
  hash: string;
  type: string;
  block: number;
  timeStamp: number;
  version: string;
}) => {
  const transactionType = TRANSACTION_TYPES.find((t) => t.key === type);
  const hasDetails = () => {
    return type === "INVOKE" && version === "0x1";
  };
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
        {hasDetails() ? (
          <Link to={"/transaction-info?hash=" + hash}>
            <span id={`transaction-hash-${hash}`} className="color-blue">
              {ellipsis(hash)}{" "}
            </span>
          </Link>
        ) : (
          <span id={`transaction-hash-${hash}`} className="color-blue">
            {ellipsis(hash)}{" "}
          </span>
        )}
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
          {convertUnixTimestampToDateString(timeStamp)}
        </Tooltip>
        <span id={`transaction-age-${hash}`}>
          {convertUnixTimestampToTimeAgo(timeStamp)}
        </span>
      </div>
    </div>
  );
};
export default TransactionRow;
