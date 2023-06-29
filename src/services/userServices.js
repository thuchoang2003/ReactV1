import axios from "axios";
import instance from "../utils/axiosCustomize";
const postCreateNewUser = (email, password, username, role, image) => {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  let response = instance.post("/participant", data);
  return response;
};

const getAllUser = () => {
  let response = instance.get("/participant/all");
  return response;
};
const updateUser = (id, username, role, image) => {
  const data = new FormData();
  data.append("id", id);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  let response = instance.put("/participant", data);
  return response;
};
const deleteUser = (id) => {
  let response = instance.delete("/participant", { data: { id: id } });
  return response;
};
const getUserWithPage = (page, limit) => {
  let response = instance.get(`/participant?page=${page}&limit=${limit}`);
  return response;
};
const userLogin = (email, password) => {
  const data = {
    email: email,
    password: password,
  };
  let response = instance.post("/login", data);
  return response;
};
const userRegister = (email, password, username) => {
  const data = {
    email: email,
    password: password,
    username: username,
  };
  let response = instance.post("/register", data);
  return response;
};
const getAllQuizzByUser = () => {
  let response = instance.get("/quiz-by-participant");
  return response;
};
const getQuestionsByQuizzId = (id) => {
  let response = instance.get(`/questions-by-quiz?quizId=${id}`);
  return response;
};
const postDataQuizz = (data) => {
  let response = instance.post("/quiz-submit", data);
  return response;
};
const postCreateNewQuizz = (description, name, difficulty, image) => {
  let data = new FormData();
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", image);
  let response = instance.post("/quiz", data);
  return response;
};
const getAllQuizzByAdmin = () => {
  let response = instance.get("/quiz/all");
  return response;
};
const deleteQuizzByAdmin = (id) => {
  let response = instance.delete(`/quiz/${id}`);
  return response;
};
const updateQuizzbyAdmin = (id, description, name, difficulty, quizImage) => {
  let data = new FormData();
  data.append("id", id);
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", quizImage);
  let response = instance.put("/quiz", data);
  return response;
};
export {
  postCreateNewUser,
  getAllUser,
  updateUser,
  deleteUser,
  getUserWithPage,
  userLogin,
  userRegister,
  getAllQuizzByUser,
  getQuestionsByQuizzId,
  postDataQuizz,
  postCreateNewQuizz,
  getAllQuizzByAdmin,
  deleteQuizzByAdmin,
  updateQuizzbyAdmin,
};
