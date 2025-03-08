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
      <Link to={`/todo/${todo._id}`} className="btn">
        <i className="fa fa-eye"></i>
      </Link>
    </article>
  );
}
