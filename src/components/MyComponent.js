import React, { useState } from "react";
import AddUser from "./AddUser";
import DisplayInfor from "./DisplayInfor";

const MyComponent = (props) => {
  const [listUsers, setListUser] = useState([
    { id: 1, name: "nguyen van a", age: "20" },
    { id: 2, name: "nguyen van b", age: "22" },
    { id: 3, name: "nguyen van c", age: "30" },
    { id: 4, name: "nguyen van d", age: "69" },
  ]);
  const handleAddNewUser = (userObject) => {
    setListUser([userObject, ...listUsers]);
  };
  const handleDeleteUser = (id) => {
    let listUsersClone = [...listUsers];
    listUsersClone = listUsersClone.filter((item) => item.id !== id);
    setListUser(listUsersClone);
  };

  return (
    <>
      <AddUser handleAddNewUser={handleAddNewUser}></AddUser>
      <br />
      <DisplayInfor
        listUsers={listUsers}
        handleDeleteUser={handleDeleteUser}
      ></DisplayInfor>
    </>
  );
};

export default MyComponent;
