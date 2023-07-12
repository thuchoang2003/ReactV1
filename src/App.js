import "./App.scss";
import "./assets/scss/HomePage.scss";
import Header from "./components/Header/Header";
import { Outlet, Link } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
const App = () => {
  return (
    <div className="app-container">
      <div className="header-container">
        <Header></Header>
      </div>
      <div className="main-container">
        <div className="sidenav-container"></div>
        <div className="app-content">
          <PerfectScrollbar>
            <Outlet></Outlet>
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
};

export default App;
