const { useSelector } = ReactRedux;

export function AppFooter() {
  const loggedInUser = useSelector(
    (storeState) => storeState.userModule.loggedInUser
  );

  const darkClass = loggedInUser
    ? loggedInUser.prefs.isDarkMode
      ? "dark"
      : ""
    : "";

  return (
    <footer className={`app-footer ${darkClass}`}>
      <h3>
        {loggedInUser && <span>Your Balance: {loggedInUser.balance}</span>}
      </h3>
    </footer>
  );
}
