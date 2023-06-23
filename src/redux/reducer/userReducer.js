import { Get_Info_User_Success_Login } from "../action/userAction";
const INITIAL_STATE = {
  account: {
    access_token: "",
    refresh_token: "",
    username: "",
    role: "",
    image: "",
    email: "",
  },
  isAuthenticated: false,
};
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Get_Info_User_Success_Login:
      return {
        ...state,
        account: {
          access_token: action?.payload?.access_token,
          refresh_token: action?.payload?.refresh_token,
          username: action?.payload?.username,
          role: action?.payload?.role,
          image: action?.payload?.image,
          email: action?.payload?.email,
        },
        isAuthenticated: true,
      };
    default:
      return state;
  }
};

export default userReducer;
