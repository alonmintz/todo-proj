import { userService } from "../../services/user.service";
import {
  SET_USER,
  UPDATE_BALANCE,
  ADD_USER_ACTIVITY,
} from "../reducers/user.reducer";
import { store } from "../store.js";

export function login(user) {
  return userService
    .login(user)
    .then((loggedUser) => {
      store.dispatch({ type: SET_USER, user: loggedUser });
    })
    .catch((err) => {
      console.log("user action -> Cannot login", err);
      throw err;
    });
}

export function signup(user) {
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

export function logout() {
  return userService.logout().then(() => {
    store.dispatch({ type: SET_USER, user: null });
  });
}

export function updateBalance(balance) {
  //todo: complete
}

export function addActivity(activity) {
  //todo: complete
}
