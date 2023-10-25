import { Flex, Text, Button, Badge } from "@chakra-ui/react";
import { v4 } from "uuid";

import TaskPad from "./TaskPad";
import { tasksReducer } from "../store/tasksReducer";
import { useReducer, useState } from "react";
import AllModal from "../components/AllModal";
import EditTask from "./EditTask";
import { Tasks } from "../components/ProjectsTasks";

interface ColumnProps {
  tasks: Tasks[];
  currentProjectID: string;
  columntName: "queue" | "development" | "done";
  columntColor: string;
  addTask: () => void;
}

const Column = ({
  tasks,
  currentProjectID,
  columntName,
  columntColor,
  addTask,
}: ColumnProps) => {
  const [tasksStore, dispatch] = useReducer(tasksReducer, []);
  // ==============================MODAL=============================
  const [isOpen1, setIsOpen1] = useState(false);
  const [currentTaskID, setCurrentTaskID] = useState("");
  //   console.log(tasksStore);

  const openModal = (id: string) => {
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

  // ==============================RENDER FASE===============================
  return (
    <>
      <AllModal
        // size={"20px"}
        size={"xl"}
        title={"FETUS Index"}
        onOpen={isOpen1}
        onClose={() => setIsOpen1(false)}
        children={<EditTask taskID={currentTaskID} />}
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
          <Button borderRadius={50} h={4} w={"100%"} onClick={() => addTask()}>
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
          {tasks.map((task, index) => (
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
