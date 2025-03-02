import { COLORS_MAP } from "../services/todo.service.js";

export function ColorSelector({ onSetColor, currentColor, isDarkMode }) {
  console.log({ isDarkMode });
  console.log({ currentColor });

  const colorKeys = Object.keys(COLORS_MAP);

  function compareColorObjects(colorObject1, colorObject2) {
    return JSON.stringify(colorObject1) === JSON.stringify(colorObject2);
  }

  return (
    <section className="color-selector">
      {colorKeys.map((colorKey) => (
        <div
          key={colorKey}
          className={`color-item ${
            compareColorObjects(currentColor, COLORS_MAP[colorKey])
              ? "chosen"
              : ""
          }`}
          style={{
            backgroundColor: isDarkMode
              ? COLORS_MAP[colorKey].dark
              : COLORS_MAP[colorKey].light,
          }}
          onClick={() => onSetColor(COLORS_MAP[colorKey])}
        ></div>
      ))}
    </section>
  );
}
