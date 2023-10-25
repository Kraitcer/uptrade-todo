import { Flex, Heading, SimpleGrid, VStack } from "@chakra-ui/react";

import { useLocation } from "react-router-dom";
import Column from "../UI Components/Column";
import AllModal from "./AllModal";
import { useEffect, useReducer, useState } from "react";
import { tasksReducer } from "../store/tasksReducer";
import { v4 } from "uuid";
import EditTask from "../UI Components/EditTask";

export interface TasksStatus {
  status: "queue" | "development" | "done";
}
export interface Tasks {
  id: string;
  taskName: string;
  currentProjectID: string;
  status: "queue" | "development" | "done";
  description: string;
}

const ProjectsTasks = () => {
  let { state: currentProject } = useLocation();
  const [tasksStore, dispatch] = useReducer(tasksReducer, []);

  // ==============================MODAL=============================
  const [isOpen1, setIsOpen1] = useState(false);
  const [currentTaskID, setCurrentTaskID] = useState("");

  const openModal = (id: string) => {
    setCurrentTaskID(id);
    setIsOpen1(true);
  };

  // ==============================ADD=============================
  const addTask = (status: "queue" | "development" | "done") => {
    dispatch({
      type: "ADD_TASK",
      payload: {
        id: v4(),
        taskName: `new ${status} Task`,
        currentProjectID: currentProject.id,
        status: status,
        description: "",
      },
    });
  };
  // ==============================DELETE=============================
  const onDelete = (id: string) => {
    dispatch({
      type: "DELETE_TASK",
      payload: id,
    });
  };

  // ==============================LOCAL STORAGE=============================

  useEffect(() => {
    if (tasksStore.length > 0)
      localStorage.setItem("tasks", JSON.stringify(tasksStore));
  }, [tasksStore]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks && storedTasks.length > 0) {
      const parsedTasks = JSON.parse(storedTasks);
      dispatch({ type: "SET_TASKS", payload: parsedTasks });
    }
  }, [dispatch]);
  // ==============================RENDER FASE===============================

  return (
    <>
      <AllModal
        size={"xl"}
        title={"FETUS Index"}
        onOpen={isOpen1}
        onClose={() => setIsOpen1(false)}
        children={<EditTask taskID={currentTaskID} />}
      />
      <VStack justifyContent={"center"} alignItems={"center"}>
        <Heading
          fontSize={{ base: "4xl", sm: "5xl", md: "6xl" }}
          fontWeight="bold"
          textAlign="center"
          textTransform={"uppercase"}
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          mt={4}
        >
          {currentProject.task}
        </Heading>
        <Flex bg={"blue.100"} borderRadius={20} p={4}>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, md: 4 }}>
            <Column
              onEdit={(id) => openModal(id)}
              onDelete={(id) => onDelete(id)}
              tasks={tasksStore.filter((task) => task.status === "queue")}
              addTask={() => addTask("queue")}
              currentProjectID={currentProject.id}
              columntName={"queue"}
              columntColor={"green.200"}
            />
            <Column
              onEdit={(id) => openModal(id)}
              onDelete={(id) => onDelete(id)}
              tasks={tasksStore.filter((task) => task.status === "development")}
              addTask={() => addTask("development")}
              currentProjectID={currentProject.id}
              columntName={"development"}
              columntColor={"purple.200"}
            />
            <Column
              onEdit={(id) => openModal(id)}
              onDelete={(id) => onDelete(id)}
              addTask={() => addTask("done")}
              tasks={tasksStore.filter((task) => task.status === "done")}
              currentProjectID={currentProject.id}
              columntName={"done"}
              columntColor={"pink.200"}
            />
          </SimpleGrid>
        </Flex>
      </VStack>
    </>
  );
};

export default ProjectsTasks;
