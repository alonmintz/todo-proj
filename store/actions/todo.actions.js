import { todoService } from "../../services/todo.service.js";
import {
  ADD_TODO,
  REMOVE_TODO,
  SET_TODOS,
  UNDO_TODOS,
  UPDATE_TODO,
  SET_IS_LOADING,
} from "../reducers/todo.reducer.js";
import { store } from "../store.js";

export const todoActions = {
  loadTodos,
  saveTodo,
  removeTodo,
};

function loadTodos() {
  const filterBy = store.getState().todoModule.filterBy;
  store.dispatch({ type: SET_IS_LOADING, isLoading: true });
  return todoService
    .query(filterBy)
    .then((todos) => {
      store.dispatch({ type: SET_TODOS, todos });
    })
    .catch((err) => {
      console.log("todo action -> Cannot load todos", err);
      throw err;
    })
    .finally(() => {
      store.dispatch({ type: SET_IS_LOADING, isLoading: false });
    });
}

function saveTodo(todo) {
  const type = todo._id ? UPDATE_TODO : ADD_TODO;
  return todoService
    .save(todo)
    .then((savedTodo) => {
      store.dispatch({ type, todo: savedTodo });
      return savedTodo;
    })
    .catch((err) => {
      console.log("todo action -> Cannot save todo", err);
      throw err;
    });
}

function removeTodo(todoId) {
  store.dispatch({ type: REMOVE_TODO, todoId });
  return todoService.remove(todoId).catch((err) => {
    store.dispatch({ type: UNDO_TODOS });
    console.log("todo action -> Cannot remove todo", err);
    throw err;
  });
}
