import React from "react";

class AddUser extends React.Component {
  state = {
    name: "Admin",
    address: "Da Nang",
    age: 26,
  };

  handleonChangeInputName = (event) => {
    this.setState({
      name: event.target.value,
    });
  };
  handleonChangeInputAge = (event) => {
    this.setState({
      age: event.target.value,
    });
  };
  handleOnSubmit = (event) => {
    event.preventDefault();
    this.props.handleAddNewUser({
      id: Math.floor(Math.random() * 100 + 1) + "-random",
      name: this.state.name,
      age: this.state.age,
    });
  };
  render() {
    return (
      <div>
        My name is {this.state.name} and i'm from {this.state.address}, i'm{" "}
        {this.state.age} years old
        <form
          onSubmit={(event) => {
            this.handleOnSubmit(event);
          }}
        >
          <input
            type="text"
            value={this.state.name}
            onChange={(event) => {
              this.handleonChangeInputName(event);
            }}
          ></input>
          <br />
          <input
            type="text"
            value={this.state.age}
            onChange={(event) => {
              this.handleonChangeInputAge(event);
            }}
          ></input>
          <br />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default AddUser;
