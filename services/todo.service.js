import { utilService } from "./util.service.js";
import { storageService } from "./async-storage.service.js";

const TODO_KEY = "todoDB";
const itemsPerPage = 5;
export const COLORS = [
  "#FFCDD2", // Light Red
  "#E1BEE7", // Light Purple
  "#BBDEFB", // Light Blue
  "#C8E6C9", // Light Green
  "#FFF9C4", // Light Yellow
  "#F5F5F5", // Light Grey
];

export const COLORS_MAP = {
  red: {
    light: "#FFCDD2",
    dark: "#B71C1C",
  },
  purple: {
    light: "#E1BEE7",
    dark: "#4A148C",
  },
  blue: {
    light: "#BBDEFB",
    dark: "#0D47A1",
  },
  green: {
    light: "#C8E6C9",
    dark: "#1B5E20",
  },
  yellow: {
    light: "#FFF9C4",
    dark: "#D6A600",
  },
  grey: {
    light: "#F5F5F5",
    dark: "#616161",
  },
};
_createTodos();

export const todoService = {
  query,
  get,
  remove,
  save,
  getEmptyTodo,
  getDefaultFilter,
  getFilterFromSearchParams,
  getImportanceStats,
};
// For Debug (easy access from console):
window.cs = todoService;

function query(filterBy = {}) {
  return storageService.query(TODO_KEY).then((todos) => {
    if (filterBy.txt) {
      const regExp = new RegExp(filterBy.txt, "i");
      todos = todos.filter((todo) => regExp.test(todo.txt));
    }

    if (filterBy.importance) {
      todos = todos.filter((todo) => todo.importance >= filterBy.importance);
    }

    if (filterBy.isDone) {
      todos = todos.filter(
        (todo) => todo.isDone === JSON.parse(filterBy.isDone)
      );
    }
    return todos;
  });
}

function get(todoId) {
  return storageService.get(TODO_KEY, todoId).then((todo) => {
    todo = _setNextPrevTodoId(todo);
    return todo;
  });
}

function remove(todoId) {
  return storageService.remove(TODO_KEY, todoId);
}

function save(todo) {
  if (todo._id) {
    todo.updatedAt = Date.now();
    return storageService.put(TODO_KEY, todo);
  } else {
    todo.createdAt = todo.updatedAt = Date.now();

    return storageService.post(TODO_KEY, todo);
  }
}

function getEmptyTodo(txt = "", importance = 5) {
  return {
    txt,
    importance,
    isDone: false,
    bgColor: { light: "#F5F5F5", dark: "#616161" },
  };
}

function getDefaultFilter() {
  return { txt: "", importance: 0, isDone: null };
}

function getFilterFromSearchParams(searchParams) {
  const defaultFilter = getDefaultFilter();
  const filterBy = {};
  for (const field in defaultFilter) {
    filterBy[field] = searchParams.get(field) || "";
  }
  return filterBy;
}

function getImportanceStats() {
  return storageService.query(TODO_KEY).then((todos) => {
    const todoImportancePercentageMap = _getTodoPercentByImportanceMap(todos);
    const data = Object.keys(todoImportancePercentageMap).map(
      (importanceLevel) => ({
        title: importanceLevel,
        value: todoImportancePercentageMap[importanceLevel],
      })
    );
    return data;
  });
}

function _createTodos() {
  let todos = utilService.loadFromStorage(TODO_KEY);
  if (!todos || !todos.length) {
    todos = [];
    const txts = ["Learn React", "Master CSS", "Practice Redux"];
    for (let i = 0; i < 20; i++) {
      const txt = txts[utilService.getRandomIntInclusive(0, txts.length - 1)];
      todos.push(
        _createTodo(txt + (i + 1), utilService.getRandomIntInclusive(1, 10))
      );
    }
    utilService.saveToStorage(TODO_KEY, todos);
  }
}

function _createTodo(txt, importance) {
  const todo = getEmptyTodo(txt, importance);
  todo._id = utilService.makeId();
  todo.createdAt = todo.updatedAt =
    Date.now() - utilService.getRandomIntInclusive(0, 1000 * 60 * 60 * 24);
  todo.bgColor = _getRandomColorObject();

  return todo;
}

function _getRandomColorObject() {
  const keys = Object.keys(COLORS_MAP);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return COLORS_MAP[randomKey];
}

function _setNextPrevTodoId(todo) {
  return storageService.query(TODO_KEY).then((todos) => {
    const todoIdx = todos.findIndex((currTodo) => currTodo._id === todo._id);
    const nextTodo = todos[todoIdx + 1] ? todos[todoIdx + 1] : todos[0];
    const prevTodo = todos[todoIdx - 1]
      ? todos[todoIdx - 1]
      : todos[todos.length - 1];
    todo.nextTodoId = nextTodo._id;
    todo.prevTodoId = prevTodo._id;
    return todo;
  });
}

function _getTodoPercentByImportanceMap(todos) {
  const totalTodos = todos.length;
  const todoCountByImportanceMap = todos.reduce(
    (map, todo) => {
      if (todo.importance < 3) map.low++;
      else if (todo.importance < 7) map.normal++;
      else map.urgent++;
      return map;
    },
    { low: 0, normal: 0, urgent: 0 }
  );
  if (totalTodos > 0) {
    return {
      low: _customFloor((todoCountByImportanceMap.low / totalTodos) * 100),
      normal: _customFloor(
        (todoCountByImportanceMap.normal / totalTodos) * 100
      ),
      urgent: _customFloor(
        (todoCountByImportanceMap.urgent / totalTodos) * 100
      ),
    };
  } else {
    return { low: 0, normal: 0, urgent: 0 };
  }
}

function _customFloor(value) {
  const decimalPart = value - Math.floor(value);
  let roundingFactor = 10;
  while ((decimalPart * roundingFactor) % 1 === 0 && roundingFactor < 1000) {
    roundingFactor *= 10;
  }
  const firstSignificantDigit = Math.floor(decimalPart * roundingFactor) % 10;
  if (firstSignificantDigit < 5) {
    return Math.floor(value);
  } else {
    return Math.ceil(value);
  }
}

// Data Model:
// const todo = {
//     _id: "gZ6Nvy",
//     txt: "Master Redux",
//     importance: 9,
//     isDone: false,
//     createdAt: 1711472269690,
//     updatedAt: 1711472269690
// }
