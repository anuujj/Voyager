import { Transaction } from "../types/transactions";
import {
  convertUnixTimestampToDateTimeString,
  convertUnixTimestampToTimeAgo,
  getGasConsumed,
  hexWeiToEth,
  hexWeiToUsd,
} from "../utils";
import CallData from "./CallData";
import QuestionMark from "./QuestionMark";

const Overview = ({ transaction }:{transaction: Transaction}) => {
  return (
    <section className="transaction-overview">
      <article>
        <h2>{"Transaction Details"}</h2>
        <div className="overview-grid">
          <div className="df ai-c">
            <QuestionMark
              tooltipInfo="Unique number of the block in which the transaction is processed"
              id="transaction-overview-block-number"
            />
            <span>{"Block Number: "}</span>
          </div>
          <div className="value color-blue">{transaction?.block}</div>
          <div className="df ai-c">
            <QuestionMark
              tooltipInfo="Time at which the transaction was processed"
              id="transaction-overview-timestamp"
            />
            <span>{"TimeStamp: "}</span>
          </div>
          <div className="value">{`${convertUnixTimestampToTimeAgo(
            transaction?.timeStamp
          )} (${convertUnixTimestampToDateTimeString(
            transaction?.timeStamp
          )})`}</div>
          <div className="df ai-c">
            <QuestionMark
              tooltipInfo="Actual fee paid for executing the transaction"
              id="transaction-overview-actual-fee"
            />
            <span>{"Actual Fee: "}</span>
          </div>
          <div className="value">
            {`${hexWeiToEth(transaction?.actualFee?.amount)} ETH $${hexWeiToUsd(
              transaction?.actualFee?.amount,
              transaction.ethPrice
            ).toFixed(6)}`}
          </div>
          <div className="df ai-c">
            <QuestionMark
              tooltipInfo="Max fee set when submitting the transaction"
              id="transaction-overview-max-fee"
            />
            <span>{"Max Fee: "}</span>
          </div>
          <div className="value">{`${hexWeiToEth(
            transaction?.maxFee
          )} ETH $${hexWeiToUsd(
            transaction?.actualFee?.amount,
            transaction.ethPrice
          ).toFixed(6)}`}</div>
          <div className="df ai-c">
            <QuestionMark
              tooltipInfo="Gas consumed for the transaction execution"
              id="transaction-overview-gas"
            />
            <span>{"Gas Consumed: "}</span>
          </div>
          <div className="value">
            {getGasConsumed(
              transaction?.actualFee?.amount,
              transaction?.l1GasPrice
            ).toFixed(0)}
          </div>
          <div className="df ai-c">
            <QuestionMark
              tooltipInfo="Sending party of the transaction"
              id="transaction-overview-sender"
            />
            <span>{"Sender Address: "}</span>
          </div>
          <div className="value">{transaction?.sender}</div>
        </div>
      </article>
      <article>
        <h2>{"Developer Info"}</h2>
        <div className="overview-grid">
          <div className="df ai-c">
            <QuestionMark
              tooltipInfo="Unix timestamp at which the transaction was processed"
              id="transaction-overview-unix-timestamp"
            />
            <span>{"Unix Timestamp: "}</span>
          </div>
          <div className="value">
            {transaction?.timeStamp}
            <button>
              <img
                src="images/copy_to_clipboard.svg"
                alt="copy to clipboard"
                className="copy-icon"
                onClick={() =>
                  navigator.clipboard.writeText(
                    transaction?.timeStamp.toString()
                  )
                }
              />
            </button>
          </div>
          <div className="df ai-c">
            <QuestionMark
              tooltipInfo="Nonce of the transaction"
              id="transaction-overview-nonce"
            />
            <span>{"Nonce: "}</span>
          </div>
          <div className="value">{transaction?.nonce}</div>
          <div className="df ai-c">
            <QuestionMark
              tooltipInfo="Index of the transaction within the block"
              id="transaction-overview-position"
            />
            <span>{"Position: "}</span>
          </div>
          <div className="value">{transaction?.position}</div>
          <div className="df ai-c">
            <QuestionMark
              tooltipInfo="Version of the transaction"
              id="transaction-overview-version"
            />
            <span>{"Version: "}</span>
          </div>
          <div className="value">{transaction?.version}</div>
          <div className="df ai-c">
            <QuestionMark
              tooltipInfo="Resources utilized to execute the transaction"
              id="transaction-overview-execution-resources"
            />
            <span>{"Execution Resources: "}</span>
          </div>
          <div className="value">
            {!!transaction?.executionResources?.steps && (
              <div className="resource-steps">
                {transaction?.executionResources?.steps + " STEPS"}
              </div>
            )}
            <div className="df">
              {!!transaction?.executionResources
                ?.pedersen_builtin_applications && (
                <div className="resource-builtin">
                  {transaction?.executionResources
                    ?.pedersen_builtin_applications + " PEDERSEN_BUILTIN"}
                </div>
              )}
              {!!transaction?.executionResources
                ?.range_check_builtin_applications && (
                <div className="resource-builtin">
                  {transaction?.executionResources
                    ?.range_check_builtin_applications + " BITWISE_BUILTIN"}
                </div>
              )}
              {!!transaction?.executionResources
                ?.ecdsa_builtin_applications && (
                <div className="resource-builtin">
                  {transaction?.executionResources?.ecdsa_builtin_applications +
                    " EC_OP_BUILTIN"}
                </div>
              )}
            </div>
          </div>
          <div className="df ai-fs">
            <div className="df ai-c">
              <QuestionMark
                tooltipInfo="Calldata that was sent in the transaction"
                id="transaction-overview-calldata"
              />
              <span>{"Calldata: "}</span>
            </div>
          </div>
          <CallData data={transaction.callData} />
          <div className="df ai-fs">
            <div className="df ai-c">
              <QuestionMark
                tooltipInfo="Signature(s) of the transaction"
                id="transaction-overview-signature"
              />
              <span>{"Signature(s): "}</span>
            </div>
          </div>
          <div>
            {transaction?.signature?.map((item: string) => (
              <div className="color-orange df jc-sb hover-effect signature">
                {item}
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
              </div>
            ))}
          </div>
        </div>
      </article>
    </section>
  );
};
export default Overview;
