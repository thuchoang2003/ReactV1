import {
  Get_Info_User_Success_Login,
  User_Logout_Success,
  User_Update_Profile,
  changePassword,
} from "../action/userAction";
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
    case User_Logout_Success:
      return {
        ...state,
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
    case User_Update_Profile:
      return {
        ...state,
        account: {
          access_token: state.account.access_token,
          refresh_token: state.account.refresh_token,
          username: action?.payload?.username,
          role: state.account.role,
          image: state.account.image,
          email: state.account.email,
        },
        isAuthenticated: true,
      };

    default:
      return state;
  }
};

export default userReducer;
