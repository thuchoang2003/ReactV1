import Select from "react-select";
import { useState } from "react";
import {
  AiFillCamera,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import "../../../../assets/scss/ManagerQuestion.scss";

const ManagerQuestion = (props) => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [selectedOption, setSelectedOption] = useState(null);
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
              options={options}
              className="custom-select"
            />
          </div>
        </div>
        <div className="add_new_questions">
          <label className="title">Add Questions:</label>
          <div className="div-Questions">
            <div class="form-floating mb-3">
              <input
                class="form-control"
                id="floatingInput"
                placeholder="name@example.com"
              />
              <label for="floatingInput">Add new questions</label>
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
              />
              <AiFillMinusCircle
                size={"2.5em"}
                style={{ color: "red", cursor: "pointer" }}
              />
            </div>
          </div>
          <div className="div-answers">
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
          </div>
        </div>
      </div>
    </>
  );
};
export default ManagerQuestion;
