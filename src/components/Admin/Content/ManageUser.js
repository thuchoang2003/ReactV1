import { useState } from "react";
import Example from "./ModalCreateUser";
import "../../../assets/scss/ManagerUser.scss";
import { BsPlusCircleFill } from "react-icons/bs";
import TableUser from "../../User/TableUser";

const ManageUser = (props) => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="users-content">
        <div className="btn-add-new">
          <button
            className="btn btn-primary"
            onClick={() => setShowModalCreateUser(true)}
          >
            <BsPlusCircleFill />
            Add New User
          </button>
        </div>
        <div className="table-users-container">
          <TableUser></TableUser>
        </div>
        <Example
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
        ></Example>
      </div>
    </div>
  );
};

export default ManageUser;
