import { UserMsg } from "./UserMsg.jsx";
import { LoginSignup } from "./LoginSignup.jsx";
import { showErrorMsg } from "../services/event-bus.service.js";
import { ModalFrame } from "./modal/ModalFrame.jsx";
import { userActions } from "../store/actions/user.actions.js";

const { useState } = React;
const { Link, NavLink } = ReactRouterDOM;
const { useNavigate } = ReactRouter;
const { useSelector } = ReactRedux;

export function AppHeader() {
  const loggedInUser = useSelector(
    (storeState) => storeState.userModule.loggedInUser
  );
  const [isLoginSignupOpen, setIsLoginSignupOpen] = useState(false);
  const navigate = useNavigate();

  function onLogout() {
    userActions
      .logout()
      .then(navigate("/"))
      .catch((err) => {
        showErrorMsg("Oops try again");
      });
  }

  function toggleLogin() {
    setIsLoginSignupOpen((prev) => !prev);
  }

  const darkClass = loggedInUser
    ? loggedInUser.prefs.isDarkMode
      ? "dark"
      : ""
    : "";

  return (
    // <header className={`app-header full main-layout ${darkClass}`}>
    <header className={`app-header full ${darkClass}`}>
      <section className="header-container">
        <h1>React Todo App</h1>
        {loggedInUser ? (
          <section>
            <Link to={`/user/${loggedInUser._id}`}>
              Hello {loggedInUser.fullname}
            </Link>
            <span> Balance: {loggedInUser.balance}</span>
            <button onClick={onLogout}>Logout</button>
          </section>
        ) : (
          <button onClick={toggleLogin}>Login</button>
        )}
        {isLoginSignupOpen && (
          <ModalFrame onClose={toggleLogin}>
            <LoginSignup onToggleLogin={toggleLogin} />
          </ModalFrame>
        )}
      </section>
      <UserMsg />
    </header>
  );
}
