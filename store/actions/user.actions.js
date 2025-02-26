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

function updateBalance({ _id: userId, balance }, activityTxt) {
  const newBalance = balance + 10;
  const newActivity = { txt: activityTxt, at: Date.now() };
  return userService
    .updateUserBalance(userId, newBalance, newActivity)
    .then((loggedUser) => {
      store.dispatch({ type: SET_USER, user: loggedUser });
      return loggedUser;
    })
    .catch((err) => {
      console.log("user action -> Cannot update balance", err);
      throw err;
    });
}

function addActivity(activity) {
  //todo: complete
}
