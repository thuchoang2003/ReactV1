import "../../../assets/scss/DashBoard.scss";
import {
  LineChart,
  Line,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { getAllDataOverview } from "../../../services/userServices.js";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTranslation, Trans } from "react-i18next";
const Dashboard = (props) => {
  const [totalUser, setTotalUser] = useState();
  const [totalQuizz, setTotalQuizz] = useState();
  const [totalQuestion, setTotalQuestion] = useState();
  const [totalAdmin, setTotalAdmin] = useState();
  const [dataChart, setdataChart] = useState([]);
  const { t } = useTranslation();
  const getData = async () => {
    let res = await getAllDataOverview();
    if (res && res.EC === 0) {
      setTotalUser(res.DT.users.countUsers);
      setTotalAdmin(res.DT.users.countAdmin);
      setTotalQuizz(res.DT.others.countQuiz);
      setTotalQuestion(res.DT.others.countQuestions);
      const data = [
        {
          name: "Quizzes",
          Qz: res?.DT?.others?.countQuiz,
        },
        {
          name: "Questions",
          Qs: res?.DT?.others?.countQuestions,
        },
        {
          name: "Users",
          Us: res?.DT?.users?.countUsers,
        },
      ];
      setdataChart(data);
    } else {
      toast.error(res.EM);
    }
  };

  useEffect(() => {
    getData();
    // setdataChart(data);
  }, []);
  return (
    <div className="dashboard-container">
      <div className="title">Analytisc DashBoard</div>
      <div className="content">
        <div className="c-left">
          <div className="c-left__item">
            <span className="text-1">{t("Admin.Dashboard.TotalUser")}</span>
            <span className="text-2">{totalUser}</span>
          </div>
          <div className="c-left__item">
            <span className="text-1">{t("Admin.Dashboard.TotalAdmin")}</span>
            <span className="text-2">{totalAdmin}</span>
          </div>
          <div className="c-left__item">
            <span className="text-1">{t("Admin.Dashboard.TotalQuizzes")}</span>
            <span className="text-2">{totalQuizz}</span>
          </div>
          <div className="c-left__item">
            <span className="text-1">
              {t("Admin.Dashboard.TotalQuestions")}
            </span>
            <span className="text-2">{totalQuestion}</span>
          </div>
        </div>
        <div className="c-right">
          <ResponsiveContainer width={"95%"} height={"95%"}>
            <BarChart data={dataChart}>
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Qz" fill="#8fbcf2" />
              <Bar dataKey="Qs" fill="#ffa500" />
              <Bar dataKey="Us" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
