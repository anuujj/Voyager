import { useEffect, useState } from "react";
import fetchTransactionsDetails from "../services/fetchTransactionDetails";
import { useLocation } from "react-router-dom";
import "react-tooltip/dist/react-tooltip.css";
import { TRANSACTION_TYPES } from "../constants/transactions";
import Overview from "../components/Overview";
import Events from "../components/Events";
import "../styles/transactionDetails.css";
import QuestionMark from "../components/QuestionMark";

const TransactionInfo = () => {
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
      setTransactionType(TRANSACTION_TYPES.find((t) => t.key === data.type));
      console.log(data);
    } catch (error) {
      console.error("Error fetching transaction details:", error);
    }
  };
  useEffect(() => {
    fetchTransactionsDetailsAndUpdateState(hash);
  }, []);
  return (
    <main>
      <h1>{"Transaction"}</h1>
      <div>
        <div>
          <span>{"Hash"}</span>
          <button>
            <img
              src="images/copy_to_clipboard.svg"
              alt="copy to clipboard"
              className="copy-icon"
              onClick={() => navigator.clipboard.writeText(hash)}
            />
          </button>
        </div>
        <div>{transaction?.hash}</div>
      </div>
      <div>
        <div>
          <div>
            <span>{"Type"}</span>
            <QuestionMark
              tooltipInfo="Transaction Type"
              id="transaction-type-ques"
            />
          </div>
          <div style={transactionType?.style} className="transaction-type">
            {transaction?.type}
          </div>
        </div>
        <div>
          <div>{"TimeStamp"}</div>
          <div>{transaction?.timeStamp}</div>
        </div>
      </div>
      <div>
        <div>{"Status"}</div>
        <div>{transaction?.status}</div>
      </div>
      <div>
        <span
          className={selectedSection === "Overview" ? "selectedTab" : ""}
          onClick={() => setSelectedSection("Overview")}
        >
          {"Overview"}
        </span>
        <span
          className={selectedSection === "Events" ? "selectedTab" : ""}
          onClick={() => setSelectedSection("Events")}
        >
          {"Events"}
        </span>
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
