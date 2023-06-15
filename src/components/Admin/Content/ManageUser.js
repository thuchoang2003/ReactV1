import { useState } from "react";
import Example from "./ModalCreateUser";
import "../../../assets/scss/ManagerUser.scss";

const ManageUser = (props) => {
  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="users-content">
        <div>
          <button>add new user</button>
        </div>
        <div>table users</div>
        <Example></Example>
      </div>
    </div>
  );
};

export default ManageUser;
