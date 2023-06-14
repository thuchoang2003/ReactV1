import Sidebar from "../Sidebar/Sidebar";
import "../../assets/scss/Admin.scss";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
const Admin = (props) => {
  const [collapsed, setcollapsed] = useState(false);
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <Sidebar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <FaBars
          onClick={() => {
            setcollapsed(!collapsed);
          }}
        />
      </div>
    </div>
  );
};
export default Admin;
