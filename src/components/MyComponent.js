import React from "react";
class MyComponent extends React.Component {
  state = {
    name: "Admin",
    address: "Da Nang",
    age: 26,
  };
  handleclick(event) {
    console.log("hehe");
    alert("hehe");
    console.log(event);
  }
  handleonMouseOver(event) {
    console.log(event);
  }

  //JSX
  render() {
    return (
      <div>
        My name is {this.state.name} and i'm from {this.state.address}
        <button onMouseOver={this.handleonMouseOver}>houver me</button>
        <button onClick={this.handleclick}>click me</button>
      </div>
    );
  }
}

export default MyComponent;
