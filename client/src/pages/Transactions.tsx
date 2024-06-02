import { useState } from "react";
import FilterTabs from "../components/FilterTabs";
import {
  TRANSACTION_HEADING,
  TRANSACTION_SUBHEADING,
  TRANSACTION_TYPES,
} from "../constants/transactions";
import RecyclerView from "../components/RecyclerView";
import TransactionRow from "../components/TransactionRow";

const Transactions = () => {
  const [selectedTab, setSelectedTab] = useState(TRANSACTION_TYPES[0].key);
  const handleTabSelection = (tab: { key: string; label: string }) => {
    setSelectedTab(tab.key);
  };
  const rowRenderer = (item: any) => {
    return <TransactionRow status={"Invoked"} hash={"123"} type={"Invoke"} operations={"234"} block={12434} age={"24 march 2023"}/>
  }
  return (
    <main>
      <h1>{TRANSACTION_HEADING}</h1>
      <h3>{TRANSACTION_SUBHEADING}</h3>
      <FilterTabs
        tabs={TRANSACTION_TYPES}
        selectedTab={selectedTab}
        onTabSelect={handleTabSelection}
      />
      <RecyclerView
        data={[{some: "data"}]}
        onScrollDown={() => {}}
        onScrollUp={() => {}}
        itemHeight={10}
        rowRenderer={rowRenderer}
      />
    </main>
  );
};
export default Transactions;
