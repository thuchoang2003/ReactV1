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
const postQuestionByAdmin = (quizzId, description, questionImage) => {
  let data = new FormData();
  data.append("quiz_id", quizzId);
  data.append("description", description);
  data.append("questionImage", questionImage);
  let response = instance.post("/question", data);
  return response;
};
const postAnswerWithQuestionByAdmin = (
  description,
  correct_answer,
  questionId
) => {
  const data = {
    description: description,
    correct_answer: correct_answer,
    question_id: questionId,
  };
  let response = instance.post("/answer", data);
  return response;
};
const putQuestionByAdmin = (id, quiz_id, description, questionImage) => {
  let data = new FormData();
  data.append("id", id);
  data.append("quiz_id", quiz_id);
  data.append("description", description);
  data.append("questionImage", questionImage);
  let response = instance.put("/question", data);
  return response;
};
const putAnswerWithQuestionByAdmin = (
  description,
  correct_answer,
  question_id,
  answer_id
) => {
  const data = {
    description: description,
    correct_answer: correct_answer,
    question_id: question_id,
    answer_id: answer_id,
  };
  let response = instance.put("/answer", data);
  return response;
};
const getAllQuestionAndAnswer = (quizzId) => {
  let response = instance.get(`/quiz-with-qa/${quizzId}`);
  return response;
};
const assignQuizzToUser = (quizId, userId) => {
  const data = {
    quizId: quizId,
    userId: userId,
  };
  let response = instance.post("/quiz-assign-to-user", data);
  return response;
};
const postLogout = (email, refresh_token) => {
  const data = {
    email: email,
    refresh_token: refresh_token,
  };
  let response = instance.post("/logout", data);
  return response;
};
const getAllDataOverview = () => {
  let response = instance.get("/overview");
  return response;
};
const updateProfile = (username, userImage) => {
  let data = new FormData();
  data.append("username", username);
  data.append("userImage", userImage);
  let response = instance.post("/profile", data);
  return response;
};
const changePassword = (current_password, new_password) => {
  const data = {
    current_password: current_password,
    new_password: new_password,
  };
  let response = instance.post("/change-password", data);
  return response;
};
const getHistory = () => {
  let response = instance.get("/history");
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
  postQuestionByAdmin,
  putQuestionByAdmin,
  postAnswerWithQuestionByAdmin,
  putAnswerWithQuestionByAdmin,
  getAllQuestionAndAnswer,
  assignQuizzToUser,
  postLogout,
  getAllDataOverview,
  updateProfile,
  changePassword,
  getHistory,
};
