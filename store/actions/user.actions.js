import { userService } from "../../services/user.service.js";
import {
  SET_USER,
  UPDATE_BALANCE,
  ADD_USER_ACTIVITY,
} from "../reducers/user.reducer.js";
import { store } from "../store.js";

export const userActions = {
  login,
  signup,
  logout,
  updateBalance,
  addActivity,
};

function login(user) {
  return userService
    .login(user)
    .then((loggedUser) => {
      console.log(loggedUser);

      store.dispatch({ type: SET_USER, user: loggedUser });
    })
    .catch((err) => {
      console.log("user action -> Cannot login", err);
      throw err;
    });
}

function signup(user) {
  return userService
    .signup(user)
    .then((loggedUser) => {
      store.dispatch({ type: SET_USER, user: loggedUser });
    })
    .catch((err) => {
      console.log("user action -> Cannot signup", err);
      throw err;
    });
}

function logout() {
  return userService.logout().then(() => {
    store.dispatch({ type: SET_USER, user: null });
  });
}

function updateBalance(balance) {
  //todo: complete
}

function addActivity(activity) {
  //todo: complete
}
