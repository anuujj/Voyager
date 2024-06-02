import "../styles/filterTab.css";

interface IFilterTabProps {
  tabs: Tab[],
  selectedTab: string;
  onTabSelect: (tab: Tab) => void;
}
type Tab = {label: string, key: string};

const FilterTabs = ({ tabs, selectedTab, onTabSelect }: IFilterTabProps) => {
  return (
    <div className="tab-container">
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`tab ${tab.key === selectedTab ? "selected" : ""}`}
          onClick={() => onTabSelect(tab)}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
};

export default FilterTabs;
