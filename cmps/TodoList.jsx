import { TodoPreview } from "./TodoPreview.jsx";
const { Link } = ReactRouterDOM;

export function TodoList({ todos, onRemoveTodo, onToggleTodo, isDarkMode }) {
  //TODO: re-style the todo "card" (buttons)
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li
          key={todo._id}
          style={{
            backgroundColor: `${
              isDarkMode ? todo.bgColor.dark : todo.bgColor.light
            }`,
          }}
        >
          <TodoPreview todo={todo} onToggleTodo={() => onToggleTodo(todo)} />
          <section className="btn-group">
            <button>
              <Link to={`/todo/edit/${todo._id}`}>
                <i className="fa fa-edit"></i>
              </Link>
            </button>
            <button>
              <Link to={`/todo/${todo._id}`}>
                <i className="fa fa-eye"></i>
              </Link>
            </button>
            <button onClick={() => onRemoveTodo(todo)}>
              <i className="fa fa-trash-o"></i>
            </button>
          </section>
        </li>
      ))}
    </ul>
  );
}
