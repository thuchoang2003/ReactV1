import { useEffect, useState } from "react";
import "../../../../assets/scss/ManageQuizz.scss";
import { BsPlusCircleFill } from "react-icons/bs";
import Select from "react-select";
import {
  postCreateNewQuizz,
  getAllQuizzByAdmin,
} from "../../../../services/userServices.js";
import TableQuizz from "./TableQuizz";
import Accordion from "react-bootstrap/Accordion";
const ManageQuizz = (props) => {
  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("EASY");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [listQuizz, setListQuizz] = useState({});

  const getAllQuizz = async () => {
    let res = await getAllQuizzByAdmin();
    if (res && res.EC === 0) {
      setListQuizz(res.DT);
    }
  };

  useEffect(() => {
    getAllQuizz();
  }, []);
  const handleChange = (option) => {
    setType(option);
  };
  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  };
  const handleClickBtnSave = async () => {
    if (!name) {
      alert("Enter your name quizz!");
      return;
    } else {
      let res = await postCreateNewQuizz(description, name, type.value, image);
      if (res && res.EC === 0) {
        alert(res.EM);
      } else alert(res.EM);
    }
  };

  return (
    <div className="quizz-container">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Manage Quizz</Accordion.Header>
          <Accordion.Body>
            <div className="add-new">
              <fieldset className="border rounded-3 p-3">
                <legend className="float-none w-auto px-3">
                  Add New Quizz
                </legend>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                    value={name}
                  />
                  <label>Name</label>
                </div>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Description"
                    value={description}
                    onChange={(event) => {
                      setDescription(event.target.value);
                    }}
                  />
                  <label>Description</label>
                </div>
                <div className="more-actions">
                  <div className="divSelect">
                    <label>Difficult:</label>
                    <Select
                      options={options}
                      placeholder={"Quizz type..."}
                      size={"3em"}
                      value={type}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="divImage">
                    <div className="divImage-img">
                      <label
                        for="inputState"
                        class="form-label label-upload"
                        htmlFor="labelUpload"
                      >
                        <BsPlusCircleFill size="1.5em" />
                        Upload file image:
                      </label>
                      <input
                        type="file"
                        hidden
                        id="labelUpload"
                        onChange={(event) => handleUploadImage(event)}
                      />
                    </div>
                    <div className="divImage-previewImg">
                      {previewImage ? (
                        <img src={previewImage}></img>
                      ) : (
                        <span>Preview Image</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="divBtn">
                  <button
                    className="btn btn-warning"
                    onClick={() => handleClickBtnSave()}
                  >
                    Save
                  </button>
                </div>
              </fieldset>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <hr />
      <div className="title">Manage Quizz</div>

      <div className="list-detail">
        <TableQuizz listQuizz={listQuizz} />
      </div>
    </div>
  );
};
export default ManageQuizz;
