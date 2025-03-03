import { userService } from "../../services/user.service.js";
import {
  SET_USER,
  UPDATE_BALANCE,
  ADD_USER_ACTIVITY,
  UPDATE_USER_PREFERENCES,
} from "../reducers/user.reducer.js";
import { store } from "../store.js";

export const userActions = {
  login,
  signup,
  logout,
  updateBalance,
  addActivity,
  updatePreferences,
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
    .updateUser(userId, { newBalance, newActivity })
    .then((loggedUser) => {
      store.dispatch({ type: SET_USER, user: loggedUser });
      return loggedUser;
    })
    .catch((err) => {
      console.log("user action -> Cannot update balance", err);
      throw err;
    });
}

function addActivity({ _id: userId }, activityTxt) {
  const newActivity = { txt: activityTxt, at: Date.now() };
  return userService
    .updateUser(userId, { newActivity })
    .then((loggedUser) => {
      store.dispatch({ type: ADD_USER_ACTIVITY, activity: newActivity });
      return loggedUser;
    })
    .catch((err) => {
      console.log("user action -> Cannot add activity", err);
      throw err;
    });
}

function updatePreferences({ _id: userId }, newFullname, newPrefs) {
  return userService
    .updateUser(userId, { newPrefs, newFullname })
    .then((loggedUser) => {
      store.dispatch({
        type: UPDATE_USER_PREFERENCES,
        prefs: newPrefs,
        fullname: newFullname,
      });
      return loggedUser;
    })
    .catch((err) => {
      console.log("user action -> Cannot update preferences", err);
      throw err;
    });
}
