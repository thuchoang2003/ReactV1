export const Get_Info_User_Success_Login = "Get Info User Success Login";

export const doLogin = (data) => {
  return {
    type: Get_Info_User_Success_Login,
    payload: data,
  };
};
