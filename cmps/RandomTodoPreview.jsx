const { Link } = ReactRouterDOM;

export function RandomTodoPreview({ todo, isDarkMode }) {
  return (
    <article
      className="random-todo-preview"
      style={{
        backgroundColor: `${
          isDarkMode ? todo.bgColor.dark : todo.bgColor.light
        }`,
      }}
    >
      <h1>{todo.txt}</h1>
      <h3>Importance: {todo.importance}</h3>
      <button>
        <Link to={`/todo/${todo._id}`}>Details</Link>
      </button>
    </article>
  );
}
