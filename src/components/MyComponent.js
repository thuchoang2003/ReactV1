import React from "react";
import AddUser from "./AddUser";
import DisplayInfor from "./DisplayInfor";
class MyComponent extends React.Component {
  state = {
    listUsers: [
      { id: 1, name: "nguyen van a", age: "20" },
      { id: 2, name: "nguyen van b", age: "22" },
      { id: 3, name: "nguyen van c", age: "30" },
      { id: 4, name: "nguyen van d", age: "69" },
    ],
  };
  handleAddNewUser = (userObj) => {
    this.setState({
      listUsers: [...this.state.listUsers, userObj],
    });
  };
  //JSX
  render() {
    return (
      <div>
        <AddUser handleAddNewUser={this.handleAddNewUser}></AddUser>
        <br />
        <DisplayInfor listUsers={this.state.listUsers}></DisplayInfor>
      </div>
    );
  }
}

export default MyComponent;
