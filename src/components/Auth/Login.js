import "../../../src/assets/scss/Login.scss";
import Form from "react-bootstrap/Form";
import { FcGoogle } from "react-icons/fc";

import { BsFacebook } from "react-icons/bs";
const Login = () => {
  return (
    <>
      <div className="login-header">
        <span>Don't have an account yet?</span>
        <button>Sign up</button>
      </div>
      <div className="login-main">
        <div className="login-main__title">Thi Thử Toeic</div>
        <div className="login-main__text">Hello,who's this?</div>
        <div className="login-main__form">
          <Form>
            <Form.Group className="mb-3 " controlId="formGroupEmail">
              <Form.Label className="login-main__form--tittle">
                Email address
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                className="login-main__form--input"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label className="login-main__form--tittle">
                Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                className="login-main__form--input"
              />
            </Form.Group>
            <div className="login-main__linktoForgotPass">
              <a href="#">Forgot password</a>
            </div>
            <button>Login</button>
          </Form>
        </div>
        <div className="login-main__footer">
          <div className="login-main__footer--line">
            <span>OR</span>
          </div>
          <div className="login-main__footer--divButton">
            <div className="Google">
              <button>
                <FcGoogle size="1.8rem"></FcGoogle>Login with Google
              </button>
            </div>
            <div className="Facebook">
              <button>
                <BsFacebook size="1.8rem"></BsFacebook>Login with Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
