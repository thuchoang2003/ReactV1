import Form from "react-bootstrap/Form";
import "../../assets/scss/ChangePassword.scss";
import { useState } from "react";
import { changePassword } from "../../services/userServices.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { doLogout } from "../../redux/action/userAction";
const ChangePassword = (props) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordAgain, setNewPasswordAgain] = useState("");
  const navigate = useNavigate();
  const handleChangePass = async () => {
    if (oldPassword === "" || newPassword === "" || newPasswordAgain === "") {
      alert("Please fill all information");
    } else if (newPassword !== newPasswordAgain) {
      alert("Password Confirmation and Password don't match");
    } else {
      let res = await changePassword(oldPassword, newPassword);
      if (res && res.EC === 0) {
        alert(res.EM);
        navigate("/login");
      } else {
        alert(res.EM);
      }
    }
  };
  return (
    <>
      <div className="changepass-container">
        <div className="changepass-item">
          <Form.Label htmlFor="inputPassword5">Old Password</Form.Label>
          <Form.Control
            type="password"
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
            onChange={(event) => setOldPassword(event.target.value)}
          />
        </div>
        <div className="changepass-item">
          <Form.Label htmlFor="inputPassword5">New Password</Form.Label>
          <Form.Control
            type="password"
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
            onChange={(event) => setNewPassword(event.target.value)}
          />
        </div>
        <div className="changepass-item">
          <Form.Label htmlFor="inputPassword5">New Password Again</Form.Label>
          <Form.Control
            type="password"
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
            onChange={(event) => setNewPasswordAgain(event.target.value)}
          />
        </div>
      </div>
      <div className="changepassbtn">
        <button className="btn btn-primary" onClick={() => handleChangePass()}>
          Save
        </button>
      </div>
    </>
  );
};
export default ChangePassword;
