import { MainWrapper } from "../cmps/MainWrapper.jsx";
import { ToggleButton } from "../cmps/ToggleButton.jsx";

const { useState } = React;

export function Home() {
  const [activeMode, setActiveMode] = useState("list"); // Default mode is 'list'

  const handleToggle = (mode) => {
    setActiveMode(mode); // Set the active mode based on the clicked button
  };

  return (
    <MainWrapper>
      <section className="home">
        <div>
          <button
            onClick={() => handleToggle("list")}
            style={{
              backgroundColor: activeMode === "list" ? "lightgray" : "white",
            }}
          >
            List Mode
          </button>
          <button
            onClick={() => handleToggle("icon")}
            style={{
              backgroundColor: activeMode === "icon" ? "lightgray" : "white",
            }}
          >
            Icon Mode
          </button>
        </div>
        <div>
          {activeMode === "list" ? (
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </ul>
          ) : (
            <div style={{ display: "flex", gap: "10px" }}>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "lightblue",
                }}
              >
                Icon 1
              </div>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "lightgreen",
                }}
              >
                Icon 2
              </div>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "lightcoral",
                }}
              >
                Icon 3
              </div>
            </div>
          )}
        </div>
      </section>
    </MainWrapper>
  );

  // const [isOn, setIsOn] = useState(false)

  // return (
  //     <section className="home">
  //         <h1>Todo's R Us!</h1>

  //         <ToggleButton val={isOn} setVal={setIsOn} />
  //         {isOn && <img src="../assets/img/todo.png" alt="" />}
  //     </section>
  // )
}
