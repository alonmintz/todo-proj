import { userService } from "../../services/user.service.js";

export const SET_USER = "SET_USER";
export const UPDATE_BALANCE = "UPDATE_USER_BALANCE";
export const ADD_USER_ACTIVITY = "ADD_USER_ACTIVITY";

const initialState = {
  loggedInUser: userService.getLoggedInUser(),
};

export function userReducer(state = initialState, cmd = {}) {
  switch (cmd.type) {
    case SET_USER:
      return {
        ...state,
        loggedInUser: cmd.user,
      };
    case UPDATE_BALANCE:
      return {
        ...state,
        loggedInUser: { ...state.loggedInUser, balance: cmd.balance },
      };
    case ADD_USER_ACTIVITY:
      return {
        ...state,
        loggedInUser: {
          ...state.loggedInUser,
          activities: [cmd.activity, ...state.loggedInUser.activities],
        },
      };
    default:
      return state;
  }
}
