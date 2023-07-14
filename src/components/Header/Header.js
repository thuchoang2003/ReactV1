import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { postLogout } from "../../services/userServices.js";
import { toast } from "react-toastify";
import { doLogout } from "../../redux/action/userAction.js";
import Language from "./Language.js";
import { useTranslation, Trans } from "react-i18next";
import { useState } from "react";
import ModalProfile from "./ModalProfile.js";

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const account = useSelector((state) => state.user.account);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const handleLogin = () => {
    navigate("/login");
  };
  const dispatch = useDispatch();
  const [showModalProfile, setShowModalProfile] = useState(false);
  const handleLogout = async () => {
    const email = account.email;
    const refresh_token = account.refresh_token;
    let res = await postLogout(email, refresh_token);
    if (res && res.EC === 0) {
      dispatch(doLogout());
      //clear local storage
      navigate("/login");
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          {/* <Navbar.Brand href="/">Thi Thử Toeic</Navbar.Brand> */}
          <NavLink to="/" className="navbar-brand">
            Thi Thử Toeic
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className="nav-link">
                {t("header.home")}
              </NavLink>
              <NavLink to="/users" className="nav-link">
                {t("header.Users")}
              </NavLink>
              <NavLink to="/admins" className="nav-link">
                {t("header.Admin")}
              </NavLink>
              {/* <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/users">Users</Nav.Link>
            <Nav.Link href="/admins">Admin</Nav.Link> */}
            </Nav>
            <Nav>
              <Language />
              {isAuthenticated === false ? (
                <>
                  <button className="btn-login" onClick={() => handleLogin()}>
                    {t("header.Login")}
                  </button>
                  <button className="btn-signup">{t("header.Signup")}</button>
                </>
              ) : (
                <NavDropdown
                  title={t("header.Setting")}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item onClick={() => setShowModalProfile(true)}>
                    {t("header.Profile")}
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => handleLogout()}>
                    {t("header.Logout")}
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ModalProfile show={showModalProfile} setShow={setShowModalProfile} />
    </>
  );
};

export default Header;
