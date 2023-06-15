import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";

const Example = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [previewimage, setPreviewimage] = useState("");

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewimage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        className="modalAddUser"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form class="row g-3">
            <div class="col-md-6">
              <label
                for="inputEmail4"
                class="form-label"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              >
                Email
              </label>
              <input type="email" class="form-control" />
            </div>
            <div class="col-md-6">
              <label
                for="inputPassword4"
                class="form-label"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              >
                Password
              </label>
              <input type="password" class="form-control" />
            </div>

            <div class="col-md-6">
              <label
                for="inputCity"
                class="form-label"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              >
                Username
              </label>
              <input type="text" class="form-control" />
            </div>
            <div class="col-md-4">
              <label for="inputState" class="form-label">
                Role
              </label>
              <select
                id="inputState"
                class="form-select"
                onChange={(event) => setRole(event.target.value)}
              >
                <option selected value="USER">
                  USER
                </option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div className="col-md-12">
              <label
                for="inputState"
                class="form-label label-upload"
                htmlFor="labelUpload"
              >
                <BsPlusCircleFill size="1.5em" /> Upload file image
              </label>
              <input
                type="file"
                hidden
                id="labelUpload"
                onChange={(event) => handleUploadImage(event)}
              />
            </div>
            <div className="col-md-12 img-preview">
              {previewimage ? (
                <img src={previewimage} />
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
          <Button variant="primary" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Example;
