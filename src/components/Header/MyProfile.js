import Form from "react-bootstrap/Form";
import "../../../src/assets/scss/MyProfile.scss";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updateProfile } from "../../services/userServices.js";
import { toast } from "react-toastify";
import { updateProfileRedux } from "../../redux/action/userAction";
import { useDispatch } from "react-redux";
const MyProfile = (props) => {
  const account = useSelector((state) => state.user.account);
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [imageAva, setImageAva] = useState("");
  const setData = () => {
    setUsername(account.username);
    setEmail(account.email);
    setRole(account.role);
    setImageAva(account.image);
  };
  useEffect(() => {
    setData();
  }, []);
  const handleSaveInfo = async () => {
    let res = await updateProfile(username, imageAva);
    if (res && res.EC === 0) {
      alert(res.EM);
      setUsername(res.DT.username);
      dispatch(updateProfileRedux({ username: username }));
    } else {
      alert(res.EM);
    }
  };
  return (
    <>
      <div className="myprofile-container">
        <div className="div-img">
          <img src={"data:image/jpeg;base64," + imageAva}></img>
        </div>
        <div className="div-infor">
          <div className="div-infor__item">
            <Form.Label htmlFor="inputPassword5">Username</Form.Label>
            <Form.Control
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="div-infor__item">
            <Form.Label htmlFor="inputPassword5">Email</Form.Label>
            <Form.Control
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
              disabled
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="div-infor__item">
            <Form.Label htmlFor="inputPassword5">Role</Form.Label>
            <Form.Control
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
              value={role}
              onChange={(event) => setRole(event.target.value)}
              disabled
            />
          </div>
        </div>
      </div>
      <div className="div-button">
        <button className="btn btn-primary" onClick={() => handleSaveInfo()}>
          Save
        </button>
      </div>
    </>
  );
};
export default MyProfile;
