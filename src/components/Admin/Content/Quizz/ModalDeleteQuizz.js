import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { toast } from "react-toastify";

const ModalDeleteQuizz = (props) => {
  const { show, setShow, deleteQuizz, dataQuizzToDelete } = props;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(dataQuizzToDelete);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete a quizz {dataQuizzToDelete.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete this quizz ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              deleteQuizz(dataQuizzToDelete.id);
              handleClose();
            }}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteQuizz;
