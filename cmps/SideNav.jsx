const { NavLink } = ReactRouterDOM;
const { useSelector } = ReactRedux;

export function SideNav() {
  const loggedInUser = useSelector(
    (storeState) => storeState.userModule.loggedInUser
  );

  const darkClass = loggedInUser
  ? loggedInUser.prefs.isDarkMode
    ? "dark"
    : ""
  : "";

  return (
    <aside className={`side-nav ${darkClass}`}>
      <nav className="app-nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/todo">Todos</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
    </aside>
  );
}
