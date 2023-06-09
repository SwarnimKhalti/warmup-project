import React from "react";
import TodoForm from "./todos/TodoForm";
import { Card, CardBody, Container } from "@chakra-ui/react";
import TodoList from "./todos/TodoList";

const Main = () => {
  return (
    <>
      <TodoForm />
      <TodoList />
    </>
  );
};

export default Main;
