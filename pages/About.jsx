const { useRef } = React;
const { Outlet, NavLink } = ReactRouterDOM;
import { MainWrapper } from "../cmps/MainWrapper.jsx";

export function About() {
  const titleRef = useRef();

  return (
    <MainWrapper>
      <section className="about">
        <h1 ref={titleRef}>Todo App</h1>

        <h2>Overview</h2>
        <p>
          This is a simple and efficient To-Do application built with modern web
          technologies. It is designed as a frontend project to practice the use
          of Redux for state management while providing an intuitive user
          interface to manage tasks effectively.
        </p>

        <h2>Technologies Used</h2>
        <ul>
          <li>
            <strong>React</strong>: Component-based UI development.
          </li>
          <li>
            <strong>Redux</strong>: State management.
          </li>
          <li>
            <strong>JavaScript</strong>: Core scripting language.
          </li>
          <li>
            <strong>HTML & CSS</strong>: Structuring and styling the
            application.
          </li>
        </ul>

        <h2>Features</h2>
        <ul>
          <li>Add, edit, and delete tasks.</li>
          <li>Mark tasks as completed.</li>
          <li>Responsive design for various screen sizes.</li>
          <li>Local storage support for task persistence.</li>
          <li>Dark mode support for better user experience.</li>
          <li>User balance tracking feature.</li>
        </ul>
        <nav>
          <NavLink to="/about/team">Team</NavLink> |
          <NavLink to="/about/vision">Vision</NavLink>
        </nav>

        <section>
          <Outlet />
        </section>
      </section>
    </MainWrapper>
  );
}
