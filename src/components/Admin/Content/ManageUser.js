import { useState } from "react";
import Example from "./ModalCreateUser";
import "../../../assets/scss/ManagerUser.scss";
import { BsPlusCircleFill } from "react-icons/bs";
import TableUser from "../../User/TableUser";
import { useEffect } from "react";
import { getAllUser } from "../../../services/userServices.js";
import ModalUpdateUser from "./ModalUpdateUser";
const ManageUser = (props) => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [dataUpdateUser, setdataUpdateUser] = useState({});
  const [listUsers, setListUsers] = useState([]);
  const getAllUsers = async () => {
    let res = await getAllUser();
    if (res.EC === 0 && res) {
      setListUsers(res.DT);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleClickBtnUser = (infoUser) => {
    setShowModalUpdateUser(true);
    setdataUpdateUser(infoUser);
  };

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
          <TableUser
            listUsers={listUsers}
            handleClickBtnUser={handleClickBtnUser}
            setShow={setShowModalUpdateUser}
          ></TableUser>
        </div>
        <Example
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          getAllUsers={getAllUsers}
        ></Example>
        <ModalUpdateUser
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          dataUpdateUser={dataUpdateUser}
          getAllUsers={getAllUsers}
        />
      </div>
    </div>
  );
};

export default ManageUser;
