import Sidebar from "../Sidebar/Sidebar";
import "../../assets/scss/Admin.scss";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { ToastContainer, toast } from "react-toastify";
import NavDropdown from "react-bootstrap/NavDropdown";
import "react-toastify/dist/ReactToastify.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import Language from "../Header/Language";
import { useTranslation, Trans } from "react-i18next";
const Admin = (props) => {
  const { t } = useTranslation();
  const [collapsed, setcollapsed] = useState(false);
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <Sidebar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <div className="admin-header">
          <span
            onClick={() => {
              setcollapsed(!collapsed);
            }}
          >
            {" "}
            <FaBars />
          </span>

          <div className="divSetting">
            {" "}
            <Language />
            <NavDropdown
              title={t("Admin.header.Setting")}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item>{t("Admin.header.Profile")}</NavDropdown.Item>
              <NavDropdown.Item>{t("Admin.header.Logout")}</NavDropdown.Item>
            </NavDropdown>
          </div>
        </div>
        <hr />
        <div className="admin-main">
          <PerfectScrollbar>
            <Outlet></Outlet>
          </PerfectScrollbar>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};
export default Admin;
