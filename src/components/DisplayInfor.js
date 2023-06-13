import React, { useEffect, useState } from "react";
import "./DisplayInfo.scss";
import logo from "./../logo.svg";

const DisplayInfor = (props) => {
  const { listUsers } = props;
  const [isShowHideListUser, setShowHideListUser] = useState(true);
  const handleShowHideListUser = () => {
    setShowHideListUser(!isShowHideListUser);
  };
  useEffect(() => {
    if (listUsers.length == 0) {
      alert("Xoa Het cm user r");
    }
    console.log(">> call useEffect");
  }, [listUsers]);
  console.log(">> call render");
  return (
    <div className="display-infor-container">
      <div>
        <span onClick={() => handleShowHideListUser()}>
          {isShowHideListUser === true ? "Hide list user" : "show list user"}
        </span>
      </div>
      {isShowHideListUser && (
        <>
          {listUsers.map((item) => {
            return (
              <div key={item.id} className={+item.age > 25 ? "green" : "red"}>
                <div>
                  <div>MyName is {item.name}</div>
                  <div>Age is {item.age}</div>
                </div>
                <div>
                  <button onClick={() => props.handleDeleteUser(item.id)}>
                    Delete
                  </button>
                </div>
                <hr></hr>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};
export default DisplayInfor;
