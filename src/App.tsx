import { useState } from "react";
import ToDo from "./components/ProjectsList";
import { Flex, Text } from "@chakra-ui/react";
import "./App.css";

function App() {
  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      w={"100%"}
    >
      <Text fontSize={60} mb={2}>
        Mindbox ToDoApp
      </Text>
      <ToDo />
    </Flex>
  );
}

export default App;
