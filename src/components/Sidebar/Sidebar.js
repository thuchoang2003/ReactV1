import "react-pro-sidebar/dist/css/styles.css";
// import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  FaTachometerAlt,
  FaGem,
  FaList,
  FaGithub,
  FaRegLaughWink,
  FaHeart,
  FaFacebook,
} from "react-icons/fa";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { IoIosPaper } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
const Sidebar = (props) => {
  const { image, collapsed, toggled, handleToggleSidebar } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <>
      <ProSidebar
        // image={sidebarBg}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div
            style={{
              padding: "24px",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 14,
              letterSpacing: "1px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <IoIosPaper size={"3em"} />
            <span onClick={() => navigate("/")}>Thi Thử Toeic</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem icon={<FaTachometerAlt />}>
              {t("Admin.Sidebar.Dashboard")}
              <Link to="/admins"></Link>
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <SubMenu
              // suffix={<span className="badge yellow">3</span>}
              icon={<FaGem />}
              title={t("Admin.Sidebar.Features")}
            >
              <MenuItem>
                {" "}
                {t("Admin.Sidebar.ManagerUser")}
                <Link to="/admins/manage-users"></Link>
              </MenuItem>
              <MenuItem>
                {" "}
                {t("Admin.Sidebar.ManagerQuizz")}
                <Link to="/admins/manage-quizz"></Link>
              </MenuItem>
              <MenuItem>
                {" "}
                {t("Admin.Sidebar.ManagerQuestion")}
                <Link to="/admins/manage-questions"></Link>
              </MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 24px",
            }}
          >
            <a
              href="https://www.facebook.com/profile.php?id=100017717868787"
              target="_blank"
              className="sidebar-btn"
              rel="noopener noreferrer"
            >
              <FaFacebook size={"25px"} />
              <span
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  marginLeft: "10px",
                }}
              >
                Thông tin chi tiết
              </span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
};
export default Sidebar;
