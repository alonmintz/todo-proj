const { useSelector } = ReactRedux;

export function MainWrapper({ children }) {
  const loggedInUser = useSelector(
    (storeState) => storeState.userModule.loggedInUser
  );

  const darkClass = loggedInUser
    ? loggedInUser.prefs.isDarkMode
      ? "dark"
      : ""
    : "";

  return <section className={`main-wrapper ${darkClass}`}>{children}</section>;
}
