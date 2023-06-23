import "../../assets/scss/Register.scss";
import Form from "react-bootstrap/Form";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import videohomepage from "../../assets/video/video-homepage.mp4";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { userRegister } from "../../../src/services/userServices.js";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleClickSignUp = async (event) => {
    event.preventDefault();
    if (!validateEmail(email)) {
      alert("Invalid Email!");
      return;
    }
    if (!password) {
      alert("Invalid Password!");
      return;
    }
    if (!username) {
      alert("Invalid username!");
      return;
    }
    let res = await userRegister(email, password, username);
    console.log(res);
    if (res && res.EC === 0) {
      alert(res.EM);
      navigate("/login");
    } else {
      alert(res.EM);
    }
  };
  return (
    <>
      <div className="register-container">
        <div className="register-container-left">
          <video autoPlay muted loop class="videoInsert">
            <source src={videohomepage} type="video/mp4" />
          </video>
        </div>
        <div className="register-container-right">
          <div className="register-header">
            <span>Already have an account?</span>
            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              Log in
            </button>
          </div>
          <div className="register-main">
            <div className="register-title">Thi Thử Toeic</div>
            <div className="register-text">
              Get better data with conversational forms, surveys, quizzes & more
            </div>
            <div className="register-mainform">
              <Form>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label className="register-label">Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    className="register-input"
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                  <Form.Label className="register-label">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    className="register-input"
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                  <Form.Label className="register-label">Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    className="register-input"
                    onChange={(event) => {
                      setUsername(event.target.value);
                    }}
                  />
                </Form.Group>
              </Form>
              <button onClick={(event) => handleClickSignUp(event)}>
                Sign up
              </button>
            </div>
            <div className="register-line">
              <span>OR</span>
            </div>
            <div className="register-footer">
              <button>
                <FcGoogle size="1.8rem" />
                Sign up with Google
              </button>
              <button>
                <BsFacebook size="1.8rem" />
                Sign up with Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
