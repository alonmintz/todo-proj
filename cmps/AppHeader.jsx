import { LoginSignup } from "./LoginSignup.jsx";
import { showErrorMsg } from "../services/event-bus.service.js";
import { ModalFrame } from "./modal/ModalFrame.jsx";
import { userActions } from "../store/actions/user.actions.js";

const { useState, useEffect, useRef } = React;
const { useNavigate } = ReactRouter;
const { useSelector } = ReactRedux;

export function AppHeader() {
  const loggedInUser = useSelector(
    (storeState) => storeState.userModule.loggedInUser
  );
  const [isLoginSignupOpen, setIsLoginSignupOpen] = useState(false);
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsMenuOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    // Bind event listener to document for clicks outside
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function onProfileClick() {
    setIsMenuOpen(false);
    navigate(`/user/${loggedInUser._id}`);
  }

  function onLogout() {
    userActions
      .logout()
      .then(() => {
        navigate("/");
        setIsMenuOpen(false);
      })
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
    <header className={`app-header full ${darkClass}`}>
      <section className="header-container">
        <h1>React Todo App</h1>
        {loggedInUser && <span> Balance: {loggedInUser.balance}</span>}
        {loggedInUser ? (
          <div
            onClick={toggleDropdown}
            style={{ cursor: "pointer", display: "flex", gap: "5px" }}
          >
            <i className="fa-solid fa-user"></i>
            <span>{loggedInUser.fullname}</span>
          </div>
        ) : (
          //   <img
          //     src="path_to_your_image.jpg"
          //     alt="Menu Icon"
          //     onClick={toggleDropdown}
          //     style={{ cursor: "pointer" }}
          //   />
          <button onClick={toggleLogin}>Login</button>
        )}

        {isLoginSignupOpen && (
          <ModalFrame onClose={toggleLogin}>
            <LoginSignup onToggleLogin={toggleLogin} />
          </ModalFrame>
        )}
      </section>
      {isMenuOpen && (
        <div ref={dropdownRef} className="dropdown-menu">
          <ul>
            <li onClick={onProfileClick}>
              <i className="fa-solid fa-user"></i>
              <span>Profile</span>
            </li>
            <li onClick={onLogout}>
              <i className="fa-solid fa-right-from-bracket"></i>
              <span>Logout</span>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
