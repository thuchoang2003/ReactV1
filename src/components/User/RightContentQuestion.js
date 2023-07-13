import { useEffect, useState } from "react";

const RightContentQuestion = (props) => {
  const [time, setTime] = useState(5400);
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time - minutes * 60);

  const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  let { listQuestions } = props;
  useEffect(() => {
    if (time === 0) return;

    const interval = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [time]);
  const getClassQuestion = (index) => {
    for (let i = 0; i < listQuestions.length; i++) {
      if (i === index) {
        for (let j = 0; j < listQuestions[i].arrayAnswer.length; j++) {
          if (listQuestions[i].arrayAnswer[j].isSelected === true) {
            return "questionSelected";
          }
        }
      }
    }
    return "questionNotSelected";
  };
  return (
    <>
      <div className="div-time">{formattedTime}</div>
      <hr></hr>
      <div className="list-question">
        {listQuestions &&
          listQuestions.length >= 0 &&
          listQuestions.map((item, index) => {
            return (
              <div
                className={`question ${getClassQuestion(index)}`}
                onClick={() => {
                  props.setIndex(index);
                }}
              >
                {index + 1}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default RightContentQuestion;
