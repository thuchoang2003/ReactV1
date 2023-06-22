import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-toastify";
import { postCreateNewUser } from "../../../services/userServices.js";
import _ from "lodash";
import { updateUser } from "../../../services/userServices.js";
const ModalUpdateUser = (props) => {
  const { show, setShow, dataUpdateUser } = props;

  // const [show, setShow] = useState(false);

  const handleClose = () => {
    // setEmail("");
    // setPassword("");
    // setUsername("");
    // setRole("USER");
    // setImage("");
    // setPreviewimage("");
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [previewimage, setPreviewimage] = useState("");

  useEffect(() => {
    if (!_.isEmpty(dataUpdateUser)) {
      setEmail(dataUpdateUser.email);
      setUsername(dataUpdateUser.username);
      setRole(dataUpdateUser.role);
      setImage("");
      if (dataUpdateUser.image) {
        setPreviewimage("data:image/jpeg;base64," + dataUpdateUser.image);
      }
    }
  }, [dataUpdateUser]);

  const handleUploadImage = (event) => {
    // setPreviewimage("");
    // setImage("");
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
  const handleSubmitUpdateUser = async () => {
    const id = dataUpdateUser.id;
    let res = await updateUser(id, username, role, image);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      await props.getAllUserWithPage(1, props.pageLimit);
      handleClose();
    } else {
      toast.success(res.EM);
      handleClose();
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
          <Modal.Title>Update A User</Modal.Title>
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
                disabled
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
                disabled
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
          <Button variant="primary" onClick={() => handleSubmitUpdateUser()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalUpdateUser;
