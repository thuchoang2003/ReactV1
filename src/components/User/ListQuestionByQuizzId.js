import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  getQuestionsByQuizzId,
  postDataQuizz,
} from "../../services/userServices.js";
import _ from "lodash";
import "../../assets/scss/ListQuestion.scss";
import Questions from "./Question.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalResult from "./ModalResult.js";
import RightContentQuestion from "./RightContentQuestion.js";
const ListQuestionByQuizzId = (props) => {
  const navigate = useNavigate();
  const param = useParams();
  const id = param.id;
  let [idQuizz, setId] = useState(id);
  const [index, setIndex] = useState(0);
  const [listQuestions, setlistQuestions] = useState([]);
  const location = useLocation();
  let { quizzTittle } = location.state;
  const [showModalResult, setshowModalResult] = useState(false);
  const [dataModalResult, setDataModalResult] = useState({});

  const handleClickInput = (questionId, answersId) => {
    let listQuestionsClone = _.cloneDeep(listQuestions);
    let question = listQuestionsClone.find(
      (item) => item.questionId == questionId
    );
    if (question) {
      let b = question.arrayAnswer.map((item) => {
        if (+item.id === +answersId) {
          item.isSelected = true;
        } else {
          item.isSelected = false;
        }
        return item;
      });
      setlistQuestions(listQuestionsClone);
    }
  };

  const submitData = async () => {
    let answerArray = [];
    listQuestions.forEach((item) => {
      let answerId;
      item.arrayAnswer.forEach((tmp) => {
        if (tmp.isSelected === true) answerId = +tmp.id;
      });
      answerArray.push({
        questionId: +item.questionId,
        userAnswerId: [answerId],
      });
    });
    let data = {
      quizId: +idQuizz,
      answers: answerArray,
    };
    let res = await postDataQuizz(data);
    if (res && res.EC === 0) {
      console.log(res);
      setDataModalResult({
        countCorrect: res.DT.countCorrect,
        countTotal: res.DT.countTotal,
      });
      setshowModalResult(true);
    } else alert(res.EM);
  };

  useEffect(() => {
    fetchListQuestions();
  }, [idQuizz]);
  const fetchListQuestions = async () => {
    let res = await getQuestionsByQuizzId(idQuizz);
    if (res && res.EC === 0) {
      let raw = res.DT;
      let result = _.chain(raw)
        // Group the elements of Array based on `color` property
        .groupBy("id")
        // `key` is group's name (color), `value` is the array of objects
        .map((value, key) => {
          let arrayAnswer = [];
          let questionDescription,
            image = null;
          value.forEach((item, index) => {
            if (index === 0) {
              questionDescription = item.description;
              image = item.image;
            }
            item.answers.isSelected = false;
            arrayAnswer.push(item.answers);
          });
          arrayAnswer = _.orderBy(arrayAnswer, ["id"], ["asc"]);
          let object = {
            questionId: key,
            description: questionDescription,
            image: image,
            arrayAnswer: arrayAnswer,
          };

          return object;
        })
        .value();
      setlistQuestions(result);
    }
  };

  return (
    <>
      <div className="container">
        <div className="q-left">
          <div className="q-left__title">
            Quizz {idQuizz} : {quizzTittle}
          </div>
          <div className="q-left__part">
            <button className="btn btn-primary">Part 1</button>
            <button className="btn btn-primary">Part 2</button>
            <button className="btn btn-primary">Part 3</button>
            <button className="btn btn-primary">Part 4</button>
            <button className="btn btn-primary">Part 5</button>
            <button className="btn btn-primary">Part 6</button>
            <button className="btn btn-primary">Part 7</button>
          </div>
          <div className="q-left__desOfPart">{quizzTittle}</div>
          <Questions
            data={
              listQuestions && listQuestions.length > 0
                ? listQuestions[index]
                : []
            }
            index={index}
            handleClickInput={handleClickInput}
          />

          <div className="q-left__footer">
            <button
              className="btn btn-primary"
              onClick={() => {
                if (index > 0) {
                  setIndex(index - 1);
                }
              }}
            >
              Prev
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                if (index + 1 < listQuestions.length) setIndex(index + 1);
              }}
            >
              Next
            </button>
            <button className="btn btn-success" onClick={() => submitData()}>
              Submit
            </button>
          </div>
        </div>
        <div className="q-right">
          <RightContentQuestion
            listQuestions={listQuestions}
            setIndex={setIndex}
          />
        </div>
      </div>
      <ModalResult
        show={showModalResult}
        setShow={setshowModalResult}
        dataModalResult={dataModalResult}
      />
    </>
  );
};

export default ListQuestionByQuizzId;
