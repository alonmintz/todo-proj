import { MainWrapper } from "../cmps/MainWrapper.jsx";
import { RandomTodoPreview } from "../cmps/RandomTodoPreview.jsx";
import { todoActions } from "../store/actions/todo.actions.js";
import { showErrorMsg } from "../services/event-bus.service.js";

const { useState, useEffect } = React;
const { useSelector } = ReactRedux;
const { Link } = ReactRouterDOM;

export function Home() {
  const todos = useSelector((storeState) => storeState.todoModule.todos);
  const [randomTodo, setRandomTodo] = useState(null);
  const [isAllDone, setIsAllDone] = useState(false);

  const loggedInUser = useSelector(
    (storeState) => storeState.userModule.loggedInUser
  );

  useEffect(() => {
    if (!todos || todos.length === 0) {
      todoActions.loadTodos().catch((err) => {
        console.log(err);
        showErrorMsg("Error Loading Todos");
      });
    }
  }, []);

  useEffect(() => {
    initRandomTodo();
  }, [todos]);

  function initRandomTodo() {
    if (!todos || todos.length === 0) return;

    const activeTodos = todos.filter((todo) => !todo.isDone);
    if (activeTodos.length === 0) {
      setIsAllDone(true);
    }
    const randomIndex = Math.floor(Math.random() * activeTodos.length);
    setRandomTodo(activeTodos[randomIndex]);
  }

  return (
    <MainWrapper>
      <section className="home">
        {isAllDone ? (
          <React.Fragment>
            <h1>All Done!</h1>
            <Link to="/todo/edit" className="btn">
              <i className="fa-solid fa-plus"></i> Add Todo
            </Link>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h4>We've Noticed You Haven't Completed This Yet...</h4>
            {randomTodo && (
              <RandomTodoPreview
                todo={randomTodo}
                isDarkMode={
                  loggedInUser ? loggedInUser.prefs.isDarkMode : false
                }
              />
            )}
          </React.Fragment>
        )}
      </section>
    </MainWrapper>
  );
}
