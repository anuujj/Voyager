import { useState } from "react";
import { CALL_DATA_TYPE } from "../constants/transactions";
import { getCallDataWithType } from "../utils";

const CallData = ({ data }: { data: string[] }) => {
  const [selectedType, setSelectedType] = useState(CALL_DATA_TYPE[0]);
  return (
    <div className="transaction-calldata">
      <div>
        <div className="tab-container calldata-type">
          {CALL_DATA_TYPE.map((type) => (
            <div
              key={type}
              className={`tab ${selectedType === type ? "selected" : ""}`}
              onClick={() => setSelectedType(type)}
            >
              {type}
            </div>
          ))}
        </div>
        <div className="tab-container">
          <div className="tab selected">{"Raw"}</div>
        </div>
      </div>
      <table className="calldata-table">
        <thead>
          <tr>
            <th>{"INPUT"}</th>
            <th>{"VALUE"}</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((callData: string, index: number) => {
            let item = getCallDataWithType(callData, selectedType);
            return (
              <tr key={index}>
                <td className="color-orange">{index}</td>
                <td className="df jc-sb color-green">
                  <div>"{`${item}`}"</div>
                  <button>
                    <img
                      src="images/copy_to_clipboard.svg"
                      alt="copy to clipboard"
                      className="copy-icon"
                      onClick={() =>
                        navigator.clipboard.writeText(item.toString())
                      }
                    />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default CallData;
