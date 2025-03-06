import { todoService } from "../services/todo.service.js";
import { showErrorMsg } from "../services/event-bus.service.js";
import { MainWrapper } from "../cmps/MainWrapper.jsx";

const { useState, useEffect } = React;
const { useParams, useNavigate, Link, NavLink } = ReactRouterDOM;

export function TodoDetails() {
  const [todo, setTodo] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadTodo();
  }, [params.todoId]);

  function loadTodo() {
    todoService
      .get(params.todoId)
      .then(setTodo)
      .catch((err) => {
        console.error("err:", err);
        showErrorMsg("Cannot load todo");
        navigate("/todo");
      });
  }

  if (!todo)
    return (
      <MainWrapper>
        <section className="todo-details">
          <div className="loader">Loading...</div>
        </section>
      </MainWrapper>
    );
  return (
    <MainWrapper>
      <section className="todo-details">
        <NavLink to="/todo" className="back">
          Back to list
        </NavLink>
        <h1 className={todo.isDone ? "done" : ""}>{todo.txt}</h1>
        <h4>Status: {todo.isDone ? "Done!" : "In your list"}</h4>
        <h4>Importance: {todo.importance}</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim rem
          accusantium, itaque ut voluptates quo? Vitae animi maiores nisi,
          assumenda molestias odit provident quaerat accusamus, reprehenderit
          impedit, possimus est ad?
        </p>
        <div className="prev-next">
          <Link to={`/todo/${todo.prevTodoId}`}>Previous Todo</Link>
          <span> | </span>
          <Link to={`/todo/${todo.nextTodoId}`}>Next Todo</Link>
        </div>
      </section>
    </MainWrapper>
  );
}
