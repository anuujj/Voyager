import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const Events = ({ transaction }) => {
  return (
    <section>
      <table className="transaction-events">
        <thead>
          <tr>
            <th>{"ID"}</th>
            <th>{"BLOCK"}</th>
            <th>{"Age"}</th>
          </tr>
        </thead>
        <tbody>
          {transaction?.events?.map((_, index: number) => {
            return (
              <tr>
                <Tooltip
                  anchorSelect={`#event-${index}`}
                >{`${transaction?.block}_${transaction.position}_${index}`}</Tooltip>
                <td
                  id={`#event-${index}`} className="color-blue"
                >{`${transaction?.block}_${transaction.position}_${index}`}</td>
                <td className="color-blue">
                  {transaction?.block}
                  <button>
                    <img
                      src="images/copy_to_clipboard.svg"
                      alt="copy to clipboard"
                      className="copy-icon"
                      onClick={() =>
                        navigator.clipboard.writeText(
                          transaction?.block.toString()
                        )
                      }
                    />
                  </button>
                </td>
                <Tooltip anchorSelect={`#event-timeStamp-${index}`}>
                  {transaction?.timeStamp}
                </Tooltip>
                <td id={`#event-timeStamp-${index}`}>
                  {transaction?.timeStamp}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};
export default Events;
