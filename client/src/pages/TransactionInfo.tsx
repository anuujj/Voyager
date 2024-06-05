import { useEffect, useState } from "react";
import fetchTransactionsDetails from "../services/fetchTransactionDetails";
import { useLocation } from "react-router-dom";
import "react-tooltip/dist/react-tooltip.css";
import { STEPS, TRANSACTION_TYPES } from "../constants/transactions";
import Overview from "../components/Overview";
import Events from "../components/Events";
import "../styles/transactionDetails.css";
import QuestionMark from "../components/QuestionMark";
import { convertUnixTimestampToDateTimeString } from "../utils";
import { Tooltip } from "react-tooltip";
import Stepper from "../components/Stepper";

const TransactionInfo = () => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [error, setError] = useState(false);
  const [transaction, setTransaction] = useState<any>({});
  const [transactionType, setTransactionType] = useState<any>();
  const [selectedSection, setSelectedSection] = useState<"Overview" | "Events">(
    "Overview"
  );
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const hash = queryParams.get("hash") || "";

  const fetchTransactionsDetailsAndUpdateState = async (hash: string) => {
    try {
      const data = await fetchTransactionsDetails(hash);
      setTransaction(data);
      setIsLoaded(true);
      setTransactionType(TRANSACTION_TYPES.find((t) => t.key === data.type));
      console.log(data);
    } catch (error) {
      setIsLoaded(true);
      setError(true);
      console.error("Error fetching transaction details:", error);
    }
  };
  useEffect(() => {
    fetchTransactionsDetailsAndUpdateState(hash);
  }, []);
  return !isLoaded ? (
    <div className="loading">{"Loading..."}</div>
  ) : error ? (
    <div className="error">{"Error fetching transaction details"}</div>
  ) : (
    <main className="transaction-info">
      <h1>{"Transaction"}</h1>
      <div className="df fd-c">
        <div className="transaction-keys">{"Hash"}</div>
        <div>
          <span>{transaction?.hash}</span>
          <button>
            <img
              src="images/copy_to_clipboard.svg"
              alt="copy to clipboard"
              className="copy-icon"
              onClick={() => navigator.clipboard.writeText(hash)}
            />
          </button>
        </div>
      </div>
      <div className="df">
        <div className="transaction-info-type">
          <div className="df ai-c">
            <span className="transaction-keys">{"Type"}</span>
            <QuestionMark
              tooltipInfo="Transaction Type"
              id="transaction-type-ques"
            />
          </div>
          <div style={transactionType?.style} className="transaction-type">
            {transaction?.type}
          </div>
        </div>
        <Tooltip anchorSelect={"#transaction-info-time"}>
          {convertUnixTimestampToDateTimeString(transaction?.timeStamp)}
        </Tooltip>
        <div>
          <div className="transaction-keys">{"TimeStamp"}</div>
          <div id={"transaction-info-time"}>
            {convertUnixTimestampToDateTimeString(transaction?.timeStamp)}
          </div>
        </div>
      </div>
      <div>
        <div className="transaction-keys">{"Status"}</div>
        <div>
          <Stepper steps={STEPS} />
        </div>
      </div>
      <div className="df ai-c">
        <div
          className={`${
            selectedSection === "Overview" ? "selected-tab" : ""
          } transaction-keys transaction-info-tab df ai-c`}
          onClick={() => setSelectedSection("Overview")}
        >
          {"Overview"}
        </div>
        <div
          className={`${
            selectedSection === "Events" ? "selected-tab" : ""
          } transaction-keys transaction-info-tab df ai-c`}
          onClick={() => setSelectedSection("Events")}
        >
          {"Events "}
          <span className="transaction-event-count">
            {transaction?.events?.length}
          </span>
        </div>
      </div>
      {selectedSection === "Overview" ? (
        <Overview transaction={transaction} />
      ) : (
        <Events transaction={transaction} />
      )}
    </main>
  );
};
export default TransactionInfo;
