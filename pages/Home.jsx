import { MainWrapper } from "../cmps/MainWrapper.jsx";
import { ToggleButton } from "../cmps/ToggleButton.jsx";

const { useState } = React;
const { useSelector } = ReactRedux;

export function Home() {
  const todos = useSelector((storeState) => storeState.todoModule.todos);
  //TODO: finish home page
  return (
    <MainWrapper>
      <section className="home"></section>
    </MainWrapper>
  );
}
