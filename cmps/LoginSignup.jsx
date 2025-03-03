import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { userService } from "../services/user.service.js";
import { userActions } from "../store/actions/user.actions.js";

const { useState } = React;
const { useSelector } = ReactRedux;

export function LoginSignup({ onToggleLogin }) {
    //TODO: re-style 
  //   const user = useSelector((storeState) => storeState.userModule.user);
  const [isSignup, setIsSignUp] = useState(false);
  const [credentials, setCredentials] = useState(
    userService.getEmptyCredentials()
  );

  function handleChange({ target }) {
    const { name: field, value } = target;
    setCredentials((prevCreds) => ({ ...prevCreds, [field]: value }));
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    onLogin(credentials);
  }

  function onLogin(credentials) {
    isSignup ? signup(credentials) : login(credentials);
  }

  function login(credentials) {
    userActions
      .login(credentials)
      .then(() => {
        showSuccessMsg("Logged in successfully");
        onToggleLogin();
      })
      .catch((err) => {
        showErrorMsg("Oops try again");
      });
  }

  function signup(credentials) {
    userActions
      .signup(credentials)
      .then(() => {
        showSuccessMsg("Signed in successfully");
        onToggleLogin();
      })
      .catch((err) => {
        showErrorMsg("Oops try again");
      });
  }

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={credentials.username}
          placeholder="Username"
          onChange={handleChange}
          required
          autoFocus
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          placeholder="Password"
          onChange={handleChange}
          required
          autoComplete="off"
        />
        {isSignup && (
          <input
            type="text"
            name="fullname"
            value={credentials.fullname}
            placeholder="Full name"
            onChange={handleChange}
            required
          />
        )}
        <button>{isSignup ? "Signup" : "Login"}</button>
      </form>
      <span onClick={() => setIsSignUp(!isSignup)}>
        {isSignup ? "Already a member? Login here" : "New user? Signup here"}
      </span>

      {/* <div className="btns">
        <a href="#" onClick={() => setIsSignUp(!isSignup)}>
          {isSignup ? "Already a member? Login" : "New user? Signup here"}
        </a>
      </div> */}
    </div>
  );
}
