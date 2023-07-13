export const Get_Info_User_Success_Login = "Get Info User Success Login";
export const User_Logout_Success = "User_Logout_Success";
export const doLogin = (data) => {
  return {
    type: Get_Info_User_Success_Login,
    payload: data,
  };
};
export const doLogout = () => {
  return {
    type: User_Logout_Success,
  };
};
