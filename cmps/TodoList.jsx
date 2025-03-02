import { TodoPreview } from "./TodoPreview.jsx";
const { Link } = ReactRouterDOM;

export function TodoList({ todos, onRemoveTodo, onToggleTodo, isDarkMode }) {
  //todo: ask if using a style attribute overides the <li> css?

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
          <section>
            <button onClick={() => onRemoveTodo(todo)}>Remove</button>
            <button>
              <Link to={`/todo/${todo._id}`}>Details</Link>
            </button>
            <button>
              <Link to={`/todo/edit/${todo._id}`}>Edit</Link>
            </button>
          </section>
        </li>
      ))}
    </ul>
  );
}
