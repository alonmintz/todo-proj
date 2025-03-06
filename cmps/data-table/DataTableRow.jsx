const { useState, Fragment } = React;
const { Link } = ReactRouterDOM;

export function DataTableRow({ todo, onRemoveTodo }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Fragment>
      <tr>
        <td
          className="toggle-expand"
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
        >
          {isExpanded ? "-" : "+"}
        </td>
        <td>{todo._id}</td>
        <td className={todo.isDone ? "done" : ""}>{todo.txt}</td>
        <td>{todo.importance}</td>
        <td>
          <Link to={`/todo/${todo._id}`}>
            <i className="fa fa-eye"></i>
          </Link>
          <span> | </span>
          <Link to={`/todo/edit/${todo._id}`}>
            <i className="fa fa-edit"></i>
          </Link>
          <span> | </span>
          <button className="remove-btn" onClick={() => onRemoveTodo(todo._id)}>
            <i className="fa fa-trash-o"></i>
          </button>
        </td>
      </tr>
      <tr hidden={!isExpanded}>
        <td colSpan="5" className="todo-info">
          <h5>{todo.txt}</h5>
          <img
            src={`https://robohash.org/${todo._id}`}
            style={{ maxWidth: "50px" }}
          />
          <p>{todo.txt}s are best for lorem ipsum dolor</p>
        </td>
      </tr>
    </Fragment>
  );
}
