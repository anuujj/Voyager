import QuestionMark from "./QuestionMark";

const Overview = ({ transaction }) => {
  return (
    <section>
      <article>
        <h3>{"Transaction Details"}</h3>
        <div className="overview-grid">
          <div>
            <QuestionMark
              tooltipInfo="Unique number of the block in which the transaction is processed"
              id="transaction-overview-block-number"
            />
            <span>{"Block Number: "}</span>
          </div>
          <div className="value">{transaction?.block}</div>
          <div>
            <QuestionMark
              tooltipInfo="Time at which the transaction was processed"
              id="transaction-overview-timestamp"
            />
            <span>{"TimeStamp: "}</span>
          </div>
          <div className="value">{transaction?.timeStamp?.toString()}</div>
          <div>
            <QuestionMark
              tooltipInfo="Actual fee paid for executing the transaction"
              id="transaction-overview-actual-fee"
            />
            <span>{"Actual Fee: "}</span>
          </div>
          <div className="value">{transaction?.actualFee?.toString()}</div>
          <div>
            <QuestionMark
              tooltipInfo="Max fee set when submitting the transaction"
              id="transaction-overview-max-fee"
            />
            <span>{"Max Fee: "}</span>
          </div>
          <div className="value">{transaction?.maxFee}</div>
          <div>
            <QuestionMark
              tooltipInfo="Gas consumed for the transaction execution"
              id="transaction-overview-gas"
            />
            <span>{"Gas Consumed: "}</span>
          </div>
          {
            //TODO: Add gas consumed
          }
          <div className="value">{transaction?.actualFee?.toString()}</div>
          <div>
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
        <h3>{"Developer Info"}</h3>
        <div className="overview-grid">
          <div>
            <QuestionMark
              tooltipInfo="Unix timestamp at which the transaction was processed"
              id="transaction-overview-unix-timestamp"
            />
            <span>{"Unix Timestamp: "}</span>
          </div>
          <div className="value">{transaction?.timeStamp}</div>
          <div>
            <QuestionMark
              tooltipInfo="Nonce of the transaction"
              id="transaction-overview-nonce"
            />
            <span>{"Nonce: "}</span>
          </div>
          <div className="value">{transaction?.nonce}</div>
          <div>
            <QuestionMark
              tooltipInfo="Index of the transaction within the block"
              id="transaction-overview-position"
            />
            <span>{"Position: "}</span>
          </div>
          <div className="value">{transaction?.position}</div>
          <div>
            <QuestionMark
              tooltipInfo="Version of the transaction"
              id="transaction-overview-version"
            />
            <span>{"Version: "}</span>
          </div>
          <div className="value">{transaction?.version}</div>
          <div>
            <QuestionMark
              tooltipInfo="Resources utilized to execute the transaction"
              id="transaction-overview-execution-resources"
            />
            <span>{"Execution Resources: "}</span>
          </div>
          <div className="value">
            {transaction?.executionResources?.toString()}
          </div>
          <div>
            <QuestionMark
              tooltipInfo="Calldata that was sent in the transaction"
              id="transaction-overview-calldata"
            />
            <span>{"Calldata: "}</span>
          </div>
          <div className="value">{"caldata"}</div>
          <div>
            <QuestionMark
              tooltipInfo="Signature(s) of the transaction"
              id="transaction-overview-signature"
            />
            <span>{"Signature(s): "}</span>
          </div>
          <div>
            {transaction?.signature?.map((item: string) => (
              <div>{item}</div>
            ))}
          </div>
        </div>
      </article>
    </section>
  );
};
export default Overview;
