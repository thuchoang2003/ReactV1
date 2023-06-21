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
export { postCreateNewUser, getAllUser, updateUser, deleteUser };
