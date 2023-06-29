import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { toast } from "react-toastify";
import _ from "lodash";
import Select from "react-select";

const ModalUpdateQuizz = (props) => {
  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];
  const { show, setShow, dataQuizzToUpdate, updateQuizz } = props;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [image, setImage] = useState("");
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  useEffect(() => {
    if (!_.isEmpty(dataQuizzToUpdate)) {
      setName(dataQuizzToUpdate.name);
      setDescription(dataQuizzToUpdate.description);
      setType(
        options.find((option) => option.value === dataQuizzToUpdate.difficulty)
      );
      setImage(dataQuizzToUpdate.image);
      if (dataQuizzToUpdate.image) {
        setPreviewImage("data:image/jpeg;base64," + dataQuizzToUpdate.image);
      }
    }
  }, [dataQuizzToUpdate]);
  const handleChangeSelect = (option) => {
    setType(option);
  };
  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        className="modalAddUser"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update A Quizz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form class="row g-3">
            <div class="col-md-6">
              <label for="inputEmail4" class="form-label">
                Name
              </label>
              <input
                type="text"
                class="form-control"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div class="col-md-6">
              <label for="inputPassword4" class="form-label">
                Description
              </label>
              <input
                type="text"
                class="form-control"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>

            <div class="col-md-6">
              <label for="inputCity" class="form-label">
                Difficulty
              </label>
              <Select
                options={options}
                placeholder={"Quizz type..."}
                size={"3em"}
                value={type}
                // defaultValue={{ label: type, value: type }}
                // defaultValue={{ value: type, label: type }}
                onChange={handleChangeSelect}
              />
            </div>
            <div className="col-md-12">
              <label
                for="inputState"
                class="form-label label-upload"
                htmlFor="labelUpload2"
              >
                <BsPlusCircleFill size="1.5em" /> Upload file image
              </label>
              <input
                type="file"
                hidden
                id="labelUpload2"
                onChange={(event) => handleUploadImage(event)}
              />
            </div>
            <div className="col-md-12 img-preview">
              {previewImage ? (
                <img src={previewImage} />
              ) : (
                <span>preview image</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              updateQuizz(
                dataQuizzToUpdate.id,
                description,
                name,
                type.value,
                image
              );
              handleClose();
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalUpdateQuizz;
