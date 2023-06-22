import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-toastify";
import { postCreateNewUser } from "../../../services/userServices.js";
const Example = (props) => {
  const { show, setShow } = props;
  // const [show, setShow] = useState(false);

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("USER");
    setImage("");
    setPreviewimage("");
    setShow(false);
  };

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
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleSubmitUser = async () => {
    const data = new FormData();

    if (!validateEmail(email)) {
      toast.error("Invalid email!");
      return;
    }

    if (!password) {
      toast.error("Invalid password!");
      return;
    }
    //submit data
    let res = await postCreateNewUser(email, password, username, role, image);
    console.log(res);

    if (res && res.EC === 0) {
      handleClose();
      toast.success(res.EM);
      await props.getAllUserWithPage(1, props.pageLimit);
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

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
              <label for="inputEmail4" class="form-label">
                Email
              </label>
              <input
                type="email"
                class="form-control"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div class="col-md-6">
              <label for="inputPassword4" class="form-label">
                Password
              </label>
              <input
                type="password"
                class="form-control"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div class="col-md-6">
              <label for="inputCity" class="form-label">
                Username
              </label>
              <input
                type="text"
                class="form-control"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
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
                <option value="USER" selected>
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
          <Button variant="primary" onClick={() => handleSubmitUser()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Example;
