import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../../../services/userServices.js";
import { toast } from "react-toastify";

const ModalDeleteUser = (props) => {
  const { show, setShow, dataDeleteUser, getAllUsers } = props;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClickDeleteUser = async () => {
    const id = dataDeleteUser.id;
    let res = await deleteUser(id);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      handleClose();
      await getAllUsers();
    } else {
      toast.error(res.EM);
    }
    console.log(res);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete a user {dataDeleteUser.username}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete this user ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleClickDeleteUser();
            }}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;
