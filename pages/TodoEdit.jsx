import { todoService } from "../services/todo.service.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { ColorSelector } from "../cmps/ColorSelector.jsx";
import { userActions } from "../store/actions/user.actions.js";
import { todoActions } from "../store/actions/todo.actions.js";
import { MainWrapper } from "../cmps/MainWrapper.jsx";

const { useState, useEffect } = React;
const { useNavigate, useParams } = ReactRouterDOM;
const { useSelector } = ReactRedux;

export function TodoEdit() {
  const loggedInUser = useSelector(
    (storeState) => storeState.userModule.loggedInUser
  );
  const [todoToEdit, setTodoToEdit] = useState(todoService.getEmptyTodo());
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params.todoId) loadTodo();
  }, []);

  function loadTodo() {
    todoService
      .get(params.todoId)
      .then(setTodoToEdit)
      .catch((err) => console.log("err:", err));
  }

  function handleChange({ target }) {
    const field = target.name;
    let value = target.value;

    switch (target.type) {
      case "number":
      case "range":
        value = +value || "";
        break;

      case "checkbox":
        value = target.checked;
        break;

      default:
        break;
    }

    setTodoToEdit((prevTodoToEdit) => ({ ...prevTodoToEdit, [field]: value }));
  }

  function handleColorChange(color) {
    setTodoToEdit((prevTodoToEdit) => ({ ...prevTodoToEdit, bgColor: color }));
  }

  function onSaveTodo(ev) {
    ev.preventDefault();
    todoActions
      .saveTodo(todoToEdit)
      .then((savedTodo) => {
        navigate("/todo");
        addUserActivity(`Added Todo: ${savedTodo.txt}`);
        showSuccessMsg(`Todo Saved (id: ${savedTodo._id})`);
      })
      .catch((err) => {
        showErrorMsg("Cannot save todo");
        console.log("err:", err);
      });
  }

  function addUserActivity(activityTxt) {
    userActions.addActivity(loggedInUser, activityTxt).catch((err) => {
      console.log("err:", err);
      showErrorMsg("Cannot add activity");
    });
  }

  const { txt, importance, isDone, bgColor } = todoToEdit;

  return (
    <MainWrapper>
      <section className="todo-edit">
        <form onSubmit={onSaveTodo}>
          <div className="form-item">
            <label htmlFor="txt">Todo:</label>
            <input
              onChange={handleChange}
              value={txt}
              type="text"
              name="txt"
              id="txt"
            />
          </div>
          <div className="form-item">
            <label htmlFor="importance">Importance:</label>
            <input
              onChange={handleChange}
              value={importance}
              min={1}
              max={10}
              type="number"
              name="importance"
              id="importance"
            />
          </div>
          <div className="form-item">
            <label htmlFor="isDone">Done:</label>
            <input
              onChange={handleChange}
              value={isDone}
              type="checkbox"
              name="isDone"
              id="isDone"
            />
          </div>

          <ColorSelector
            onSetColor={handleColorChange}
            currentColor={bgColor}
            isDarkMode={loggedInUser ? loggedInUser.prefs.isDarkMode : false}
          />
          <button>Save</button>
        </form>
      </section>
    </MainWrapper>
  );
}
