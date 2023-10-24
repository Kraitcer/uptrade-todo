import { Flex, Text, Button, Badge } from "@chakra-ui/react";

import TaskPad from "./TaskPad";
import { tasksReducer } from "../store/tasksReducer";
import { useReducer } from "react";

interface ColumnProps {
  currentProjectID: string;
  columntName: "queue" | "development" | "done";
  columntColor: string;
}

const Column = ({
  currentProjectID,
  columntName,
  columntColor,
}: ColumnProps) => {
  const [tasksStore, dispatch] = useReducer(tasksReducer, []);

  return (
    <Flex
      w={"560px"}
      h={{ base: "160px", md: "auto" }}
      overflowY={"auto"}
      borderRadius={20}
      bg={columntColor}
      flexDirection={"column"}
      alignItems={"center"}
      p={3}
      gap={3}
    >
      <Flex w={"100%"} gap={4} alignItems={"center"}>
        <Badge borderRadius={50} p={1}>
          <Text mx={2}>{columntName}</Text>
        </Badge>
        <Button
          borderRadius={50}
          h={4}
          w={"100%"}
          onClick={() =>
            dispatch({
              type: "ADD_TASK",
              payload: {
                taskName: `New ${columntName} task`,
                currentProjectID: currentProjectID,
                status: columntName,
              },
            })
          }
        >
          +
        </Button>
      </Flex>
      <Flex
        overflowY={"auto"}
        w={"530px"}
        h={"100%"}
        flexDirection={{ base: "row", md: "column" }}
        gap={3}
      >
        {tasksStore.map((task, index) => (
          <TaskPad key={index}>{task.taskName}</TaskPad>
        ))}
      </Flex>
    </Flex>
  );
};

export default Column;
