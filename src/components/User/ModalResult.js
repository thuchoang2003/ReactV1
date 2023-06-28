import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalResult = (props) => {
  const { show, setShow, dataModalResult } = props;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Bạn Đã Hoàn Thành Bài Thi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ fontSize: "23px", fontWeight: "400" }}>
            Tổng số câu trả lời đúng : {dataModalResult.countCorrect}
          </div>
          <div style={{ fontSize: "23px", fontWeight: "400" }}>
            Tổng số câu hỏi : {dataModalResult.countTotal}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            className="btn btn-success"
          >
            Confirm
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalResult;
