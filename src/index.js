import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./components/Admin/Admin";
import User from "./components/User/User";
import HomePage from "./components/Home/HomePage";
import ManageUser from "./components/Admin/Content/ManageUser";
import Dashboard from "./components/Admin/Content/Dashboard";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import "nprogress/nprogress.css";
import { PersistGate } from "redux-persist/integration/react";
import ListQuestionByQuizzId from "./components/User/ListQuestionByQuizzId";
import NotFound from "./components/User/NotFound";
import ManageQuizz from "./components/Admin/Content/Quizz/ManagerQuizz";
import ManagerQuestion from "./components/Admin/Content/Question/ManagerQuestion";
import ListQuizz from "./components/User/ListQuizz";
import PrivateRoute from "./Route/PrivateRoute";
import i18n from "./utils/i18n";
import { Suspense } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // storeRedux
  <Provider store={store}>
    {/* LocalStorage */}
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        {/* multi language */}
        <Suspense fallback="...is loading">
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />
              <Route
                path="users"
                element={
                  <PrivateRoute>
                    <PerfectScrollbar>
                      {" "}
                      <ListQuizz />
                    </PerfectScrollbar>
                  </PrivateRoute>
                }
              />
              <Route path="/quizz/:id" element={<ListQuestionByQuizzId />} />
            </Route>
            <Route path="*" element={<NotFound />} />
            <Route
              path="/admins"
              element={
                <PrivateRoute>
                  <Admin />
                </PrivateRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="manage-users" element={<ManageUser />} />
              <Route path="manage-quizz" element={<ManageQuizz />} />
              <Route path="manage-questions" element={<ManagerQuestion />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </PersistGate>

    {/* <React.StrictMode> */}

    {/* </React.StrictMode> */}
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
