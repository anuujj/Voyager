import { Tooltip } from "react-tooltip";

const QuestionMark = ({ tooltipInfo = "", id = "" }) => {
  return (
    <>
      <Tooltip anchorSelect={`#${id}`}>{tooltipInfo}</Tooltip>
      <img
        id={id}
        src={"images/question_mark.svg"}
        alt="?"
        className="question-mark"
      />
    </>
  );
};
export default QuestionMark;