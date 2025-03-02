import { userService } from "../../services/user.service.js";

export const SET_USER = "SET_USER";
export const UPDATE_BALANCE = "UPDATE_USER_BALANCE";
export const ADD_USER_ACTIVITY = "ADD_USER_ACTIVITY";
export const UPDATE_USER_PREFERENCES = "UPDATE_USER_PREFERENCES";

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
    case UPDATE_USER_PREFERENCES:
      return {
        ...state,
        loggedInUser: {
          ...state.loggedInUser,
          prefs: {
            ...state.loggedInUser.prefs,
            ...cmd.prefs,
          },
        },
      };
    default:
      return state;
  }
}
