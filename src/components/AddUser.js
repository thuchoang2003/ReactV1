import React, { useState } from "react";

const AddUser = (props) => {
  const [name, setName] = useState("Admin");
  const [address, setAddress] = useState("Da Nang");
  const [age, setAge] = useState(26);

  const handleonChangeInputName = (event) => {
    setName(event.target.value);
  };
  const handleonChangeInputAge = (event) => {
    setAge(event.target.value);
  };
  const handleOnSubmit = (event) => {
    event.preventDefault();
    props.handleAddNewUser({
      id: Math.floor(Math.random() * 100 + 1) + "-random",
      name: name,
      age: age,
    });
  };
  return (
    <div>
      My name is {name} and i'm from {address}, i'm {age} years old
      <form
        onSubmit={(event) => {
          handleOnSubmit(event);
        }}
      >
        <input
          type="text"
          value={name}
          onChange={(event) => {
            handleonChangeInputName(event);
          }}
        ></input>
        <br />
        <input
          type="text"
          value={age}
          onChange={(event) => {
            handleonChangeInputAge(event);
          }}
        ></input>
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
};
export default AddUser;
