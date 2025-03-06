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
import { MainWrapper } from "../cmps/MainWrapper.jsx";

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
  const [todoToRemove, setTodoToRemove] = useState(null);
  const [activeDisplayMode, setActiveDisplayMode] = useState("icon");

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

  function onRemoveTodo(todo) {
    todoActions
      .removeTodo(todo._id)
      .then(toggleIsConfirmOpen)
      .then(() => {
        setTodoToRemove(null);
        showSuccessMsg(`Todo removed`);
        addUserActivity(`Removed Todo: ${todo.txt}`);
      })
      .catch((err) => {
        console.log("err:", err);
        showErrorMsg("Cannot remove todo " + todo._id);
      });
  }

  function onToggleTodo(todo) {
    const todoToSave = { ...todo, isDone: !todo.isDone };
    todoActions
      .saveTodo(todoToSave)
      .then((savedTodo) => {
        showSuccessMsg(
          `Todo is ${savedTodo.isDone ? "done" : "back on your list"}`
        );
        if (savedTodo.isDone) {
          addUserActivity(`Completed Todo: ${savedTodo.txt}`, true);
        } else if (!savedTodo.isDone) {
          addUserActivity(`Re-Activated Todo: ${savedTodo.txt}`);
        }
      })
      .catch((err) => {
        console.log("err:", err);
        showErrorMsg("Cannot toggle todo " + todoToSave._id);
      });
  }

  function addUserActivity(activityTxt, includeBalanceUpdate) {
    if (includeBalanceUpdate) {
      userActions
        .updateBalance(loggedInUser, activityTxt)
        .then((updatedUser) => {
          setTimeout(
            () =>
              showSuccessMsg(`Great! Current Balance: ${updatedUser.balance}`),
            2500
          );
        })
        .catch((err) => {
          console.log("err:", err);
          showErrorMsg("Cannot update balance");
        });
    } else {
      userActions.addActivity(loggedInUser, activityTxt).catch((err) => {
        console.log("err:", err);
        showErrorMsg("Cannot add activity");
      });
    }
  }

  function onSetFilterBy(updatedFilterBy) {
    dispatch({ type: SET_FILTER_BY, filterBy: updatedFilterBy });
  }

  function toggleIsConfirmOpen() {
    setIsConfirmOpen((prevIsOpen) => !prevIsOpen);
  }

  function onRemoveButtonClick(todo) {
    setTodoToRemove(todo);
    toggleIsConfirmOpen();
  }

  function toggleActiveDisplayMode(mode) {
    setActiveDisplayMode(mode);
  }

  return (
    <MainWrapper>
      <section className="todo-index">
        {isLoading && <div className="loader">Loading...</div>}
        <TodoFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
        <div className="index-buttons">
          <div>
            <Link to="/todo/edit" className="btn">
              <i className="fa-solid fa-plus"></i> Add Todo
            </Link>
          </div>
          <div>
            <button
              onClick={() => toggleActiveDisplayMode("icon")}
              style={{
                backgroundColor:
                  activeDisplayMode === "icon"
                    ? "var(--light-yellow-bg2)"
                    : "var(--gray1)",
              }}
            >
              <i className="fa-solid fa-cubes"></i>
            </button>
            <button
              onClick={() => toggleActiveDisplayMode("list")}
              style={{
                backgroundColor:
                  activeDisplayMode === "list"
                    ? "var(--light-yellow-bg2)"
                    : "var(--gray1)",
              }}
            >
              <i className="fa-solid fa-table-list"></i>
            </button>
          </div>
        </div>
        {activeDisplayMode === "icon" && (
          <TodoList
            todos={todos}
            onRemoveTodo={onRemoveButtonClick}
            onToggleTodo={onToggleTodo}
            isDarkMode={loggedInUser ? loggedInUser.prefs.isDarkMode : false}
          />
        )}
        {activeDisplayMode === "list" && (
          <DataTable todos={todos} onRemoveTodo={onRemoveButtonClick} />
        )}
        <hr />
        {isConfirmOpen && (
          <ModalFrame onClose={toggleIsConfirmOpen}>
            <ConfirmAction
              action="remove"
              onConfirm={() => onRemoveTodo(todoToRemove)}
              onCancel={toggleIsConfirmOpen}
            />
          </ModalFrame>
        )}
      </section>
    </MainWrapper>
  );
}
