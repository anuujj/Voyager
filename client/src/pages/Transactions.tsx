import { useEffect, useRef, useState } from "react";
import FilterTabs from "../components/FilterTabs";
import {
  TRANSACTION_HEADERS,
  TRANSACTION_HEADING,
  TRANSACTION_SUBHEADING,
  TRANSACTION_TYPES,
} from "../constants/transactions";
import RecyclerView from "../components/RecyclerView";
import TransactionRow from "../components/TransactionRow";
import fetchTransactions from "../services/fetchTransactions";
import { Transaction } from "../types/transactions";

const Transactions = () => {
  const [selectedTab, setSelectedTab] = useState(TRANSACTION_TYPES[0].key);
  const [loading, setLoading] = useState(true);
  const [lastId, setLastId] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]); // [Transaction
  const intervalRef = useRef<any>(null);
  const rowRenderer = (item: Transaction) => {
    return <TransactionRow {...item} />;
  };

  const handleTabSelection = (tab: { key: string; label: string }) => {
    setTransactions([]);
    setLastId("");
    setSelectedTab(tab.key);
  };
  const handleScrollDown = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    fetchTransactionsAndUpdateList(lastId, selectedTab);
  };

  const fetchTransactionsAndUpdateList = async (
    id: string,
    selectedTab: string
  ) => {
    setLoading(true);
    const nextTransactions = await fetchTransactions(id, selectedTab);
    setLoading(false);
    if (nextTransactions[nextTransactions.length - 1]?._id) {
      setLastId(nextTransactions[nextTransactions.length - 1]._id);
    }
    setTransactions([...transactions, ...nextTransactions]);
  };
  useEffect(() => {
    fetchTransactionsAndUpdateList(lastId, selectedTab);
    intervalRef.current = setInterval(() => {
      fetchTransactionsAndUpdateList(lastId, selectedTab);
    }, 30000); // Fetch new transactions every 30 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [selectedTab]);
  return (
    <main>
      <h1>{TRANSACTION_HEADING}</h1>
      <h3>{TRANSACTION_SUBHEADING}</h3>
      <FilterTabs
        tabs={TRANSACTION_TYPES}
        selectedTab={selectedTab}
        onTabSelect={handleTabSelection}
      />
      {loading ? (
        <div>loading....</div>
      ) : !!transactions.length ? (
        <div className="transaction-table">
          <div className="transaction-headers">
            {TRANSACTION_HEADERS.map((header) => (
              <div key={header}>{header}</div>
            ))}
          </div>
          <div className="transactions-list">
            <RecyclerView
              data={transactions}
              onScrollDown={handleScrollDown}
              rowRenderer={rowRenderer}
            />
          </div>
        </div>
      ) : (
        <div>{"No transactions for this filter"}</div>
      )}
    </main>
  );
};
export default Transactions;
