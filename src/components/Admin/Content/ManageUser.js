import { useState } from "react";
import Example from "./ModalCreateUser";
import "../../../assets/scss/ManagerUser.scss";
import { BsPlusCircleFill } from "react-icons/bs";
import TableUser from "../../User/TableUser";
import { useEffect } from "react";
import { getAllUser } from "../../../services/userServices.js";
import { getUserWithPage } from "../../../services/userServices.js";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserWithPage from "../../User/TableUserWithPage";
import { useTranslation, Trans } from "react-i18next";
const ManageUser = (props) => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [dataUpdateUser, setdataUpdateUser] = useState({});
  const [dataDeleteUser, setdataDeleteUser] = useState({});
  const [listUsers, setListUsers] = useState([]);
  const [pageLimit, setpageLimit] = useState(11);
  const [pageCount, setpageCount] = useState(2);
  const { t } = useTranslation();
  const getAllUsers = async () => {
    let res = await getAllUser();
    if (res.EC === 0 && res) {
      setListUsers(res.DT);
    }
  };
  const getAllUserWithPage = async (page, limit) => {
    let res = await getUserWithPage(page, pageLimit);
    if (res.EC === 0 && res) {
      setListUsers(res.DT.users);
      setpageCount(res.DT.totalPages);
    }
  };

  useEffect(() => {
    // getAllUsers();
    getAllUserWithPage(1, pageLimit);
  }, []);

  const handleClickBtnUser = (infoUser) => {
    setShowModalUpdateUser(true);
    setdataUpdateUser(infoUser);
  };
  const handleClickBtnDeleteUser = (infoUser) => {
    setShowModalDeleteUser(true);
    setdataDeleteUser(infoUser);
  };

  return (
    <div className="manage-user-container">
      <div className="title">{t("ManagerUser.title")}</div>
      <div className="users-content">
        <div className="btn-add-new">
          <button
            className="btn btn-primary"
            onClick={() => setShowModalCreateUser(true)}
          >
            <BsPlusCircleFill />
            {t("ManagerUser.AddNewUser")}
          </button>
        </div>
        <div className="table-users-container">
          {/* <TableUser
            listUsers={listUsers}
            handleClickBtnUser={handleClickBtnUser}
            handleClickBtnDeleteUser={handleClickBtnDeleteUser}
            setShow={setShowModalUpdateUser}
          ></TableUser> */}
          <TableUserWithPage
            listUsers={listUsers}
            handleClickBtnUser={handleClickBtnUser}
            handleClickBtnDeleteUser={handleClickBtnDeleteUser}
            getAllUserWithPage={getAllUserWithPage}
            pageLimit={pageLimit}
            pageCount={pageCount}
          />
        </div>
        <Example
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          getAllUserWithPage={getAllUserWithPage}
          pageLimit={pageLimit}
        ></Example>
        <ModalUpdateUser
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          dataUpdateUser={dataUpdateUser}
          getAllUserWithPage={getAllUserWithPage}
          pageLimit={pageLimit}
        />
        <ModalDeleteUser
          show={showModalDeleteUser}
          setShow={setShowModalDeleteUser}
          dataDeleteUser={dataDeleteUser}
          getAllUserWithPage={getAllUserWithPage}
          pageLimit={pageLimit}
        />
      </div>
    </div>
  );
};

export default ManageUser;
