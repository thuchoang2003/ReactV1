import { useState } from "react";

const Questions = (props) => {
  const { data } = props;
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
          Question {data.questionId} : {data.description}
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
                    // id={item.id}
                    // name="optradio"
                    // onClick={(event) => {
                    //   handleClickInput(data.questionId, item.id);
                    // }}
                    checked={item.isSelected}
                    onClick={(event) => {
                      handleClick(event, data.questionId, item.id);
                    }}
                  />
                  <label className="form-check-label">{item.description}</label>
                </div>
              );
            })}
          {/* <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="radio1"
              name="optradio"
              value="option1"
            />
            <label className="form-check-label" for="radio1">
              Option 1
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="radio2"
              name="optradio"
              value="option2"
            />

            <label className="form-check-label" for="radio2">
              Option 2
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="radio3"
              name="optradio"
              value="option3"
            />

            <label className="form-check-label" for="radio3">
              Option 3
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="radio4"
              name="optradio"
              value="option4"
            />

            <label className="form-check-label" for="radio4">
              Option 4
            </label>
          </div> */}
        </div>
      </div>{" "}
    </>
  );
};
export default Questions;
