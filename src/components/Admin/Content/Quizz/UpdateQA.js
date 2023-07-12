import Accordion from "react-bootstrap/Accordion";
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
import { useNavigate } from "react-router-dom";
import {
  getAllQuizzByAdmin,
  postQuestionByAdmin,
  postAnswerWithQuestionByAdmin,
  getAllQuestionAndAnswer,
  putAnswerWithQuestionByAdmin,
  putQuestionByAdmin,
} from "../../../../services/userServices.js";
import { toast } from "react-toastify";
const UpdateQA = (props) => {
  const navigate = useNavigate();
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
  const [listQuestion, setListQuestions] = useState([]);
  function urltoFile(url, filename, mimeType) {
    if (url.startsWith("data:")) {
      var arr = url.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      var file = new File([u8arr], filename, { type: mime || mimeType });
      return Promise.resolve(file);
    }
    return fetch(url)
      .then((res) => res.arrayBuffer())
      .then((buf) => new File([buf], filename, { type: mimeType }));
  }
  // urltoFile("data:text/plain;base64,aGVsbG8=", "hello.txt", "text/plain").then(
  //   function (file) {
  //     console.log(file);
  //   }
  // );
  const getAllQA = async (id) => {
    let res = await getAllQuestionAndAnswer(id);
    if (res && res.EC === 0) {
      let listQuestionClone = _.cloneDeep(res.DT.qa);
      for (let i = 0; i < listQuestionClone.length; i++) {
        listQuestionClone[i].imageName = `question-${listQuestionClone[i].id}`;
        listQuestionClone[i].imageFile = await urltoFile(
          `data:text/plain;base64,${listQuestionClone[i].imageFile}`,
          `question-${listQuestionClone[i].id}`,
          `image/png`
        );
      }
      setListQuestions(listQuestionClone);
      console.log(listQuestionClone);
    } else {
      console.log(res.EM);
    }
  };

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
  const handlePutQuestion = async (id, quizId, description, questionImage) => {
    let res = await putQuestionByAdmin(id, quizId, description, questionImage);
    if (res && res.EC === 0) return res.DT;
  };
  const handlePutAnswer = async (
    description,
    correct_answer,
    question_id,
    answer_id
  ) => {
    let res = await putAnswerWithQuestionByAdmin(
      description,
      correct_answer,
      question_id,
      answer_id
    );
    if (res && res.EC === 0) return res.DT;
  };
  const handleClickSave = async () => {
    const quizId = selectedOption.value;
    console.log(listQuestion);
    const questionPromises = listQuestion.map(async (question) => {
      await handlePutQuestion(
        question.id,
        +quizId,
        question.description,
        question.imageFile
      );

      const answerPromises = question.answers.map((answer) =>
        handlePutAnswer(
          answer.description,
          answer.isCorrect,
          question.id,
          answer.id
        )
      );

      return Promise.all(answerPromises);
    });
    await Promise.all(questionPromises);
    toast.success("Update Successfully!");
    navigate("/admins");
    // await Promise.all(
    //   listQuestion.map(async (item) => {
    //     const q = await handlePutQuestion(
    //       +item.id,
    //       +quizId,
    //       item.description,
    //       item.imageFile
    //     );

    //     await Promise.all(
    //       item.answers.map(async (answer) => {
    //         await handlePutAnswer(
    //           answer.description,
    //           answer.isCorrect,
    //           q.id,
    //           answer.id
    //         );
    //       })
    //     );
    //   })
    // );
  };
  return (
    <div>
      <Accordion defaultActiveKey="1">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Update Quizz</Accordion.Header>
          <Accordion.Body>
            <div className="main-content">
              <div className="select-quizz">
                <label>Select Quizz:</label>
                <div className="div-select">
                  <Select
                    defaultValue={selectedOption}
                    onChange={(selected) => {
                      setSelectedOption(selected);
                      getAllQA(selected.value);
                    }}
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
                              onChange={(event) =>
                                handleUploadImage(event, item.id)
                              }
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
                              onClick={() =>
                                handleAddAndRemoveQuestion("add", "")
                              }
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
                                    style={{
                                      color: "green",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      handleAddAndRemoveAnswer(
                                        "add",
                                        item.id,
                                        ""
                                      )
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
              </div>
            </div>
            <div className="div-button">
              <button
                className="btn btn-primary"
                onClick={() => handleClickSave()}
              >
                Save Questions
              </button>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default UpdateQA;
