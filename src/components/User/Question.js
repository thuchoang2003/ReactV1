import { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
const Questions = (props) => {
  const { data, index } = props;
  const { t } = useTranslation();
  const handleClick = (event, questionId, answerId) => {
    props.handleClickInput(questionId, answerId);
  };

  return (
    <>
      <div className="q-left__divImage">
        <img
          src={"data:image/jpeg;base64," + data.image}
          className="q-left__image"
        ></img>

        {/* <img
          src={"data:image/jpeg;base64," + data.image}
          className="q-left__image"
        ></img> */}
      </div>
      <div className="q-left__divAudio">
        <audio
          className="audio"
          src="https://www.anhngumshoa.com/uploads/sound/2020/ybm2020_test10_pic1.mp3"
          controls="play"
        ></audio>
      </div>
      <div className="q-left__divAnswers">
        <p>
          Question {index + 1} : {data.description}
        </p>
        <div className="q-left__divAnswers--selected">
          {data?.arrayAnswer &&
            data?.arrayAnswer.length > 0 &&
            data.arrayAnswer.map((item) => {
              return (
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    checked={item.isSelected}
                    onClick={(event) => {
                      handleClick(event, data.questionId, item.id);
                    }}
                  />
                  <label className="form-check-label">{item.description}</label>
                </div>
              );
            })}
        </div>
      </div>{" "}
    </>
  );
};
export default Questions;
