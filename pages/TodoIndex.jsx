import { TodoFilter } from "../cmps/TodoFilter.jsx";
import { TodoList } from "../cmps/TodoList.jsx";
import { DataTable } from "../cmps/data-table/DataTable.jsx";
import { todoService } from "../services/todo.service.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { SET_FILTER_BY } from "../store/reducers/todo.reducer.js";
import { todoActions } from "../store/actions/todo.actions.js";
import { ModalFrame } from "../cmps/modal/ModalFrame.jsx";
import { ConfirmAction } from "../cmps/modal/ConfirmAction.jsx";
import { utilService } from "../services/util.service.js";
import { userActions } from "../store/actions/user.actions.js";

const { useState, useEffect } = React;
const { Link, useSearchParams } = ReactRouterDOM;
const { useSelector, useDispatch } = ReactRedux;

export function TodoIndex() {
  const loggedInUser = useSelector(
    (storeState) => storeState.userModule.loggedInUser
  );
  const todos = useSelector((storeState) => storeState.todoModule.todos);
  const filterBy = useSelector((storeState) => storeState.todoModule.filterBy);
  const isLoading = useSelector(
    (storeState) => storeState.todoModule.isLoading
  );
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [todoIdToRemove, setTodoIdToRemove] = useState("");

  useEffect(() => {
    dispatch({
      type: SET_FILTER_BY,
      filterBy: todoService.getFilterFromSearchParams(searchParams),
    });
  }, []);

  useEffect(() => {
    setSearchParams(utilService.getTruthyValues(filterBy));
    todoActions.loadTodos().catch(() => {
      showErrorMsg("Failed loading todos...");
    });
  }, [filterBy]);

  function onRemoveTodo(todoId) {
    todoActions
      .removeTodo(todoId)
      .then(toggleIsConfirmOpen)
      .then(() => {
        setTodoIdToRemove("");
        showSuccessMsg(`Todo removed`);
      })
      .catch((err) => {
        console.log("err:", err);
        showErrorMsg("Cannot remove todo " + todoId);
      });
  }

  function onToggleTodo(todo) {
    const todoToSave = { ...todo, isDone: !todo.isDone };
    todoActions
      .saveTodo(todoToSave)
      .then((savedTodo) => {
        console.log({ savedTodo });

        showSuccessMsg(
          `Todo is ${savedTodo.isDone ? "done" : "back on your list"}`
        );
      })
      .catch((err) => {
        console.log("err:", err);
        showErrorMsg("Cannot toggle todo " + todoToSave._id);
      });
  }

  function onSetFilterBy(updatedFilterBy) {
    dispatch({ type: SET_FILTER_BY, filterBy: updatedFilterBy });
  }

  function toggleIsConfirmOpen() {
    setIsConfirmOpen((prevIsOpen) => !prevIsOpen);
  }

  function onRemoveButtonClick(todoId) {
    setTodoIdToRemove(todoId);
    toggleIsConfirmOpen();
  }

  //   if (isLoading) return <div>Loading...</div>;
  return (
    <section className="todo-index">
      <TodoFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
      <div>
        <Link to="/todo/edit" className="btn">
          Add Todo
        </Link>
      </div>
      <TodoList
        todos={todos}
        onRemoveTodo={onRemoveButtonClick}
        onToggleTodo={onToggleTodo}
      />
      <hr />
      <h2>Todos Table</h2>
      <div style={{ width: "60%", margin: "auto" }}>
        <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
      </div>
      {isConfirmOpen && (
        <ModalFrame onClose={toggleIsConfirmOpen}>
          <ConfirmAction
            action="remove"
            onConfirm={() => onRemoveTodo(todoIdToRemove)}
            onCancel={toggleIsConfirmOpen}
          />
        </ModalFrame>
      )}
    </section>
  );
}
