import { userActions } from "../store/actions/user.actions.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
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
    loggedInUser ? loggedInUser.prefs.isDarkMode : false
  );
  const [fullnameToEdit, setFullnameToEdit] = useState(
    loggedInUser ? loggedInUser.fullname : ""
  );
  const [isEditMode, setIsEditMode] = useState(false);
  const [isShowActivities, setIsShowActivities] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/");
      showErrorMsg("No User Logged In");
    }
  }, [loggedInUser]);

  function onSetDarkMode(value) {
    setIsDarkModeToSave((prev) => !prev);
    dispatch({
      type: UPDATE_USER_PREFERENCES,
      prefs: { ...loggedInUser.prefs, isDarkMode: value },
      fullname: fullnameToEdit,
    });
  }

  function toggleEditMode() {
    setIsEditMode((prev) => !prev);
  }

  function onCancelNameEdit() {
    toggleEditMode();
    setFullnameToEdit(loggedInUser ? loggedInUser.fullname : "");
  }

  function handleNameChange({ target }) {
    let value = target.value;
    setFullnameToEdit(value ? value : loggedInUser.fullname);
  }

  function onSubmit(ev) {
    ev.preventDefault();
    userActions
      .updatePreferences(loggedInUser, fullnameToEdit, {
        isDarkMode: isDarkModeToSave,
      })
      .then(() => setIsEditMode(false))
      .then(() => {
        showSuccessMsg("Preferences Saved");
      })
      .catch((err) => {
        console.log(err);
        showErrorMsg("Error Updating User");
      });
  }

  function toggleShowActivities() {
    setIsShowActivities((prev) => !prev);
  }

  function formatTimeAgo(activityTime) {
    const currentTime = Date.now();
    const timePassed = currentTime - activityTime;
    let formattedTime;

    if (timePassed < 60 * 1000) {
      // less than 60 seconds
      const seconds = Math.floor(timePassed / 1000);
      formattedTime = `${seconds} seconds ago`;
    } else if (timePassed < 60 * 60 * 1000) {
      // 1 minute to 59 minutes
      const minutes = Math.floor(timePassed / (60 * 1000));
      formattedTime = `${minutes} minutes ago`;
    } else if (timePassed < 24 * 60 * 60 * 1000) {
      // 60 minutes to 24 hours
      const hours = Math.floor(timePassed / (60 * 60 * 1000));
      formattedTime = `${hours} hours ago`;
    } else if (timePassed < 7 * 24 * 60 * 60 * 1000) {
      // 24 hours to 1 week
      const days = Math.floor(timePassed / (24 * 60 * 60 * 1000));
      formattedTime = `${days} days ago`;
    } else {
      // 1 week and up
      const date = new Date(activityTime).toLocaleDateString();
      formattedTime = date;
    }

    return formattedTime;
  }

  if (!loggedInUser) {
    return (
      <MainWrapper>
        <section className="user-details">
          <h1>Sorry, there is no user logged in...</h1>
        </section>
      </MainWrapper>
    );
  }

  return (
    <MainWrapper>
      <section className="user-details">
        <form onSubmit={onSubmit} className="user-form">
          {isEditMode ? (
            <div className="user-data-container">
              <input
                type="text"
                name="fullname"
                id="fullname"
                placeholder={loggedInUser.fullname}
                onChange={handleNameChange}
              />
              <button type="button" onClick={onCancelNameEdit}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          ) : (
            <div className="user-data-container">
              <h1>{loggedInUser.fullname}</h1>
              <button type="button" onClick={toggleEditMode}>
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
            </div>
          )}
          <div className="user-data-container">
            <i className="fa-solid fa-sun"></i>
            <ToggleButton val={isDarkModeToSave} setVal={onSetDarkMode} />
            <i className="fa-solid fa-moon"></i>
          </div>

          <button>Save</button>
        </form>
        <button onClick={toggleShowActivities}>
          {isShowActivities ? "Hide" : "Show"} Activity List
        </button>
        {isShowActivities && (
          <ul>
            {loggedInUser.activities.map((activity) => (
              <li key={activity.at}>
                <span>{`${formatTimeAgo(activity.at)}:`}</span>
                <span>{` ${activity.txt}.`}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </MainWrapper>
  );
}
