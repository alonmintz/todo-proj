import { userActions } from "../store/actions/user.actions.js";
import { showErrorMsg } from "../services/event-bus.service.js";
import { ToggleButton } from "../cmps/ToggleButton.jsx";
import { UPDATE_USER_PREFERENCES } from "../store/reducers/user.reducer.js";
import { MainWrapper } from "../cmps/MainWrapper.jsx";

const { useSelector, useDispatch } = ReactRedux;
const { useState, useEffect } = React;
const { useNavigate } = ReactRouter;

export function UserDetails() {
  const loggedInUser = useSelector(
    (storeState) => storeState.userModule.loggedInUser
  );
  const [isDarkModeToSave, setIsDarkModeToSave] = useState(
    loggedInUser.prefs.isDarkMode
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/");
      showErrorMsg("No User Logged In");
    }
  }, []);

  function onSetDarkMode(value) {
    setIsDarkModeToSave((prev) => !prev);
    dispatch({
      type: UPDATE_USER_PREFERENCES,
      prefs: { ...loggedInUser.prefs, isDarkMode: value },
    });
  }

  function onSubmit(ev) {
    ev.preventDefault();
    userActions.updatePreferences(loggedInUser, {
      isDarkMode: isDarkModeToSave,
    });
  }

  //TODO: complete user details page with edit+ activities + style

  return (
    <MainWrapper>
      <section className="user-details">
        <form onSubmit={onSubmit}>
          <h1>{loggedInUser.fullname}</h1>
          <ToggleButton val={isDarkModeToSave} setVal={onSetDarkMode} />
          <button>Save</button>
        </form>
      </section>
    </MainWrapper>
  );
}
