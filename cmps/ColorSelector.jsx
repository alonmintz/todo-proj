import { COLORS } from "../services/todo.service.js";

export function ColorSelector({ onSetColor, currentColor }) {
  return (
    <section className="color-selector">
      {COLORS.map((color) => (
        <div
          key={color}
          className={`color-item ${currentColor === color ? "chosen" : ""}`}
          style={{ backgroundColor: color }}
          onClick={() => onSetColor(color)}
        ></div>
      ))}
    </section>
  );
}
