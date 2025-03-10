import { storageService } from "./async-storage.service.js";

export const userService = {
  getLoggedInUser,
  login,
  logout,
  signup,
  getById,
  query,
  getEmptyCredentials,
  updateUser,
};
const STORAGE_KEY_LOGGEDIN = "user";
const STORAGE_KEY = "userDB";

function query() {
  return storageService.query(STORAGE_KEY);
}

function getById(userId) {
  return storageService.get(STORAGE_KEY, userId);
}

function login({ username, password }) {
  return storageService.query(STORAGE_KEY).then((users) => {
    const user = users.find((user) => user.username === username);
    if (!user || user.password !== password) {
      return Promise.reject("Invalid login");
    }
    return _setLoggedInUser(user);
  });
}

function signup({ username, password, fullname }) {
  const user = { username, password, fullname };
  const now = Date.now();
  user.createdAt = user.updatedAt = now;
  user.balance = 0;
  user.activities = [{ txt: "Joined Todo App", at: now }];
  user.prefs = { isDarkMode: false };
  return storageService.post(STORAGE_KEY, user).then(_setLoggedInUser);
}

function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN);
  return Promise.resolve();
}

function getLoggedInUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN));
}

function updateUser(
  userId,
  { newBalance, newActivity, newPrefs, newFullname }
) {
  return getById(userId)
    .then((user) => ({
      ...user,
      fullname: newFullname ? newFullname : user.fullname,
      balance: newBalance ? newBalance : user.balance,
      activities: newActivity
        ? [newActivity, ...user.activities]
        : user.activities,
      prefs: newPrefs ? { ...user.prefs, ...newPrefs } : user.prefs,
      updatedAt: Date.now(),
    }))
    .then((userToUpdate) => storageService.put(STORAGE_KEY, userToUpdate))
    .then(_setLoggedInUser);
}

function _setLoggedInUser(user) {
  const userToSave = {
    _id: user._id,
    fullname: user.fullname,
    balance: user.balance,
    activities: user.activities,
    prefs: user.prefs,
  };
  console.log({ userToSave });

  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave));
  return userToSave;
}

function getEmptyCredentials() {
  return {
    fullname: "",
    username: "",
    password: "",
  };
}

// signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja'})
// login({username: 'muki', password: 'muki1'})

// Data Model:
// const user = {
//     _id: "KAtTl",
//     username: "muki",
//     password: "muki1",
//     fullname: "Muki Ja",
//     createdAt: 1711490430252,
//     updatedAt: 1711490430999
// }
