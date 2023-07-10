import Select from "react-select";
import { useEffect, useState } from "react";
import {
  AiFillCamera,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import "../../../../assets/scss/ManagerQuestion.scss";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import {
  getAllQuizzByAdmin,
  postQuestionByAdmin,
  postAnswerWithQuestionByAdmin,
} from "../../../../services/userServices.js";

const ManagerQuestion = (props) => {
  const [listQuizz, setListQuizz] = useState([]);
  const getAllQuizz = async () => {
    let res = await getAllQuizzByAdmin();
    if (res && res.EC === 0) {
      let listQuizzClone = res.DT.map((item, index) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
      setListQuizz(listQuizzClone);
    }
  };

  useEffect(() => {
    getAllQuizz();
  }, []);

  const [selectedOption, setSelectedOption] = useState(null);
  const [listQuestion, setListQuestions] = useState([
    // {
    //   id: uuidv4(),
    //   description: "",
    //   imageFile: "",
    //   imageName: "",
    //   answers: [
    //     {
    //       id: uuidv4(),
    //       description: "",
    //       isCorrect: false,
    //     },
    //     {
    //       id: uuidv4(),
    //       description: "",
    //       isCorrect: false,
    //     },
    //     {
    //       id: uuidv4(),
    //       description: "",
    //       isCorrect: false,
    //     },
    //     {
    //       id: uuidv4(),
    //       description: "",
    //       isCorrect: false,
    //     },
    //   ],
    // },
    // {
    //   id: uuidv4(),
    //   description: "",
    //   imageFile: "",
    //   imageName: "",
    //   answers: [
    //     {
    //       id: uuidv4(),
    //       description: "",
    //       isCorrect: false,
    //     },
    //   ],
    // },
  ]);

  const handleChangeInput = (questionId, answerId) => {
    let listQuestionClone = _.cloneDeep(listQuestion);
    listQuestionClone.forEach((question) => {
      if (questionId === question.id) {
        question.answers.forEach((element) => {
          if (element.id === answerId) {
            element.isCorrect = !element.isCorrect;
          }
        });
      }
    });
    console.log(listQuestionClone);
    setListQuestions(listQuestionClone);
  };
  const handleAddAndRemoveAnswer = (type, questionId, answerId) => {
    if (type === "remove") {
      let listQuestionClone = _.cloneDeep(listQuestion);
      let index = listQuestionClone.findIndex((item) => item.id === questionId);
      listQuestionClone[index].answers = listQuestionClone[
        index
      ].answers.filter((item) => item.id !== answerId);

      setListQuestions(listQuestionClone);
    } else {
      let listQuestionClone = _.cloneDeep(listQuestion);
      listQuestionClone.forEach((question) => {
        if (question.id === questionId) {
          if (question.answers.length <= 3) {
            question.answers.push({
              id: uuidv4(),
              description: "",
              isCorrect: false,
            });
          }
        }
      });
      setListQuestions(listQuestionClone);
    }
  };
  const handleAddAndRemoveQuestion = (type, questionId) => {
    if (type === "remove") {
      let listQuestionClone = _.cloneDeep(listQuestion);
      listQuestionClone = listQuestionClone.filter(
        (item) => item.id !== questionId
      );
      setListQuestions(listQuestionClone);
    } else {
      let listQuestionClone = _.cloneDeep(listQuestion);
      listQuestionClone.push({
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        answers: [
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
          },
        ],
      });
      setListQuestions(listQuestionClone);
    }
  };
  const handleEventChangeInputQuestion = (questionId, event) => {
    let listQuestionClone = _.cloneDeep(listQuestion);
    listQuestionClone.forEach((item) => {
      if (item.id === questionId) {
        item.description = event.target.value;
      }
    });
    setListQuestions(listQuestionClone);
  };
  const handleEventChangeInputAnswer = (questionId, answerId, event) => {
    let listQuestionClone = _.cloneDeep(listQuestion);
    listQuestionClone.forEach((item) => {
      if (item.id === questionId) {
        item.answers.forEach((element) => {
          if (element.id === answerId) {
            element.description = event.target.value;
          }
        });
      }
    });
    setListQuestions(listQuestionClone);
  };
  const handleUploadImage = (event, questionId) => {
    let listQuestionClone = _.cloneDeep(listQuestion);
    listQuestionClone.forEach((item) => {
      if (item.id === questionId) {
        if (event.target && event.target.files && event.target.files[0]) {
          item.imageFile = event.target.files[0];
          item.imageName = event.target.files[0].name;
        }
      }
    });
    setListQuestions(listQuestionClone);
  };
  const handlePostQuestion = async (quizId, description, questionImage) => {
    let res = await postQuestionByAdmin(quizId, description, questionImage);
    if (res && res.EC === 0) return res.DT;
  };
  const handlePostAnswer = async (description, correct_answer, question_id) => {
    let res = await postAnswerWithQuestionByAdmin(
      description,
      correct_answer,
      question_id
    );
    if (res && res.EC === 0) return res.DT;
  };
  const handleClickSave = async () => {
    const quizId = selectedOption.value;
    await Promise.all(
      listQuestion.map(async (item) => {
        const q = await handlePostQuestion(
          +quizId,
          item.description,
          item.imageFile
        );

        await Promise.all(
          item.answers.map(async (answer) => {
            await handlePostAnswer(answer.description, answer.isCorrect, q.id);
          })
        );
        console.log("check q ", q);
      })
    );
  };

  return (
    <>
      <div className="header-content">
        <div>Manager Questions</div>
        <hr></hr>
      </div>
      <div className="main-content">
        <div className="select-quizz">
          <label>Select Quizz:</label>
          <div className="div-select">
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={listQuizz}
              className="custom-select"
            />
          </div>
        </div>
        <div className="add_new_questions">
          <label className="title">Add Questions:</label>
          {listQuestion && listQuestion.length === 0 ? (
            <div className="div-Questions">
              <div class="form-floating mb-3">
                <input
                  class="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                />
                <label for="floatingInput">Add new Questions</label>
              </div>
              <div className="group-upload">
                <AiFillCamera size={"2.5em"} />
                <input hidden type="file"></input>
                <span>0 file is uploaded</span>
              </div>
              <div className="add_or_del_ques">
                <AiFillPlusCircle
                  size={"2.5em"}
                  style={{ color: "green", cursor: "pointer" }}
                  onClick={() => handleAddAndRemoveQuestion("add", "")}
                />
                <AiFillMinusCircle
                  size={"2.5em"}
                  style={{ color: "red", cursor: "pointer" }}
                />
              </div>
            </div>
          ) : (
            listQuestion.map((item, index) => {
              return (
                <>
                  <div className="div-Questions" key={`q-${index}`}>
                    <div class="form-floating mb-3">
                      <input
                        class="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        value={item.description}
                        onChange={(event) => {
                          handleEventChangeInputQuestion(item.id, event);
                        }}
                      />
                      <label for="floatingInput">{`Question ${
                        index + 1
                      }`}</label>
                    </div>
                    <div className="group-upload">
                      <label htmlFor={`${item.id}`}>
                        <AiFillCamera size={"2.5em"} />
                      </label>
                      <input
                        hidden
                        type="file"
                        id={`${item.id}`}
                        onChange={(event) => handleUploadImage(event, item.id)}
                      ></input>
                      <span>
                        {item.imageFile && item.imageName
                          ? item.imageName
                          : "0 files is uploads"}
                      </span>
                    </div>
                    <div className="add_or_del_ques">
                      <AiFillPlusCircle
                        size={"2.5em"}
                        style={{ color: "green", cursor: "pointer" }}
                        onClick={() => handleAddAndRemoveQuestion("add", "")}
                      />
                      <AiFillMinusCircle
                        size={"2.5em"}
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() =>
                          handleAddAndRemoveQuestion("remove", item.id)
                        }
                      />
                    </div>
                  </div>
                  {item.answers.map((answer, index) => {
                    return (
                      <div className="div-answers">
                        <div className="answer">
                          {answer.isCorrect === true ? (
                            <input
                              type="checkbox"
                              className="inputCheckBox"
                              checked
                              onChange={() => {
                                handleChangeInput(item.id, answer.id);
                              }}
                            ></input>
                          ) : (
                            <input
                              type="checkbox"
                              className="inputCheckBox"
                              onChange={() => {
                                handleChangeInput(item.id, answer.id);
                              }}
                            ></input>
                          )}
                          {/* <input
                            type="checkbox"
                            className="inputCheckBox"
                          ></input> */}
                          <div class="form-floating mb-3">
                            <input
                              type="email"
                              class="form-control"
                              id="floatingInputAnswer"
                              placeholder="name@example.com"
                              value={answer.description}
                              onChange={(event) =>
                                handleEventChangeInputAnswer(
                                  item.id,
                                  answer.id,
                                  event
                                )
                              }
                            />
                            <label for="floatingInputAnswer">{`Answer ${
                              index + 1
                            }`}</label>
                          </div>
                          <div className="add_or_del_answer">
                            <AiFillPlusCircle
                              size={"2.5em"}
                              style={{ color: "green", cursor: "pointer" }}
                              onClick={() =>
                                handleAddAndRemoveAnswer("add", item.id, "")
                              }
                            />
                            <AiFillMinusCircle
                              size={"2.5em"}
                              style={{ color: "red", cursor: "pointer" }}
                              onClick={() =>
                                handleAddAndRemoveAnswer(
                                  "remove",
                                  item.id,
                                  answer.id
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              );
            })
          )}

          {/* <div className="div-answers">
            <div className="answer">
              <input type="checkbox" className="inputCheckBox"></input>
              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control"
                  id="floatingInputAnswer"
                  placeholder="name@example.com"
                />
                <label for="floatingInputAnswer">Answer 1</label>
              </div>
              <div className="add_or_del_answer">
                <AiFillPlusCircle
                  size={"2.5em"}
                  style={{ color: "green", cursor: "pointer" }}
                />
                <AiFillMinusCircle
                  size={"2.5em"}
                  style={{ color: "red", cursor: "pointer" }}
                />
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <div className="div-button">
        <button className="btn btn-primary" onClick={() => handleClickSave()}>
          Save Questions
        </button>
      </div>
    </>
  );
};
export default ManagerQuestion;
