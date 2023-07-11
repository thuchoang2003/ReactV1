import Accordion from "react-bootstrap/Accordion";
import Select from "react-select";
import { useEffect, useState } from "react";
import {
  getAllQuizzByAdmin,
  getAllUser,
  assignQuizzToUser,
} from "../../../../services/userServices.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const AssignQuizz = (props) => {
  const navigate = useNavigate();
  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];
  const [listQuizz, setListQuizz] = useState([]);
  const [listUser, setListUser] = useState([]);
  const [quizId, setQuizzId] = useState();
  const [userId, setUserId] = useState();
  const [selectedOption, setSelectedOption] = useState(null);
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
  const getUser = async () => {
    let res = await getAllUser();
    if (res && res.EC === 0) {
      let listUserClone = res.DT.map((item, index) => {
        return {
          value: item.id,
          label: item.id + "-" + item.username,
        };
      });
      setListUser(listUserClone);
    }
  };
  useEffect(() => {
    getAllQuizz();
    getUser();
  }, []);

  const handleClickAssign = async () => {
    let res = await assignQuizzToUser(+quizId, +userId);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      navigate("/admins");
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <div>
      <Accordion defaultActiveKey="1">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Assign Quizz To User</Accordion.Header>
          <Accordion.Body>
            <div className="assign-maincontent">
              <div className="div-flex">
                <div className="div-selectquizz">
                  {" "}
                  <Select
                    options={listQuizz}
                    placeholder={"Select Quizz..."}
                    size={"3em"}
                    onChange={(selected) => {
                      setQuizzId(selected.value);
                      setSelectedOption(selected);
                    }}
                  />
                </div>
                <div className="div-selectuser">
                  <Select
                    options={listUser}
                    placeholder={"Select User..."}
                    size={"3em"}
                    onChange={(selected) => {
                      setSelectedOption(selected);
                      setUserId(selected.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="div-button">
              <button
                className="btn btn-primary"
                onClick={() => handleClickAssign()}
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

export default AssignQuizz;
