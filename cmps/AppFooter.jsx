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
      <h1>this is a footer</h1>
    </footer>
  );
}
