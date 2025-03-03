import { utilService } from "../services/util.service.js";
const { useRef, useEffect, useState } = React;

export function TodoFilter({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy });
  const debounceOnSetFilterBy = useRef(
    utilService.debounce(onSetFilterBy, 500)
  ).current;

  useEffect(() => {
    debounceOnSetFilterBy(filterByToEdit);
  }, [filterByToEdit]);

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
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }));
  }

  const { txt, importance, isDone } = filterByToEdit;

  return (
    <section className="todo-filter">
      <h2>Filter Todos</h2>
      <form>
        <div className="filter-item">
          <input
            value={txt}
            onChange={handleChange}
            type="search"
            placeholder="By Text"
            id="txt"
            name="txt"
          />
        </div>
        <div className="filter-item">
          <label htmlFor="importance">Importance: </label>
          <input
            value={importance}
            onChange={handleChange}
            type="number"
            min={0}
            placeholder="By Importance"
            id="importance"
            name="importance"
          />
        </div>
        <div className="filter-item">
          <label htmlFor="isDone">Status: </label>
          <select
            name="isDone"
            id="isDone"
            value={isDone || ""}
            onChange={handleChange}
          >
            <option value={""}>All</option>
            <option value={false}>Active</option>
            <option value={true}>Done</option>
          </select>
        </div>
        <button hidden>Set Filter</button>
      </form>
    </section>
  );
}
