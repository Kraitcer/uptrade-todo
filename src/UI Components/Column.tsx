import { Flex, Text, Button, Badge } from "@chakra-ui/react";

import TaskPad from "./TaskPad";
import { tasksReducer } from "../store/tasksReducer";
import { useReducer, useState } from "react";
import AllModal from "../components/AllModal";

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
  // ==============================MODAL=============================
  const [isOpen1, setIsOpen1] = useState(false);
  const [currentTaskID, setCurrentTaskID] = useState("");

  const openModal = (id: string) => {
    console.log(id);
    setCurrentTaskID(id);
    setIsOpen1(true);
  };

  // ==============================DELETE=============================

  const onDelete = (id: string) => {
    dispatch({
      type: "DELETE_TASK",
      payload: id,
    });
  };

  // ==============================ADD=============================
  const addProject = () => {
    dispatch({
      type: "ADD_TASK",
      payload: {
        taskName: `New ${columntName} task`,
        currentProjectID: currentProjectID,
        status: columntName,
      },
    });
  };
  // ==============================RENDER FASE===============================
  return (
    <>
      <AllModal
        // size={"20px"}
        size={"2xl"}
        title={"FETUS Index"}
        onOpen={isOpen1}
        onClose={() => setIsOpen1(false)}
        children={"fuck"}
      />
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
            onClick={() => addProject()}
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
            <TaskPad
              task={task}
              onDelete={() => onDelete(task.id)}
              onEdit={(id) => openModal(id)}
              key={index}
            >
              {task.taskName}
            </TaskPad>
          ))}
        </Flex>
      </Flex>
    </>
  );
};

export default Column;
