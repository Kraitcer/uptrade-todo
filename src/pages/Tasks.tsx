import { Flex, Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import { DateTime } from "luxon";

import { useLocation } from "react-router-dom";
import Column from "../components/Column";
import AllModal from "../components/AllModal";
import { useReducer, useState } from "react";
import { tasksReducer } from "../store/tasksReducer";
import { v4 } from "uuid";
import EditTask from "../components/EditTask";
import { useLocalStorage } from "../hooks/useLocalStorage";

export interface TasksStatus {
  status: "queue" | "development" | "done";
}
export interface Tasks {
  id: string;
  taskName: string;
  currentProjectID: string;
  status: "queue" | "development" | "done";
  description: string;
  creationDate: DateTime;
  timeSpent: string;
  dueDate?: DateTime;
  // dueDate: DateTime;
}

const ProjectsTasks = () => {
  let { state: currentProject } = useLocation();
  const [tasksStore, dispatch] = useReducer(tasksReducer, []);

  // console.log(tasksStore);

  // ==============================TASK FILTER=============================
  const tasksOfTheCurrentProject = tasksStore.filter(
    (task) => task.currentProjectID === currentProject.id
  );

  // ==============================MODAL=============================
  const [isOpen1, setIsOpen1] = useState(false);
  const [currentTask, setCurrentTask] = useState({} as Tasks);

  const openModal = (id: string) => {
    const currentTask = tasksStore.filter((task) => task.id === id);
    setCurrentTask(currentTask[0]);
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
        creationDate: DateTime.now(),
        timeSpent: "",
        dueDate: undefined,
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

  // ==============================EDIT================================
  const onEdit = (
    id: string,
    taskName: string,
    description: string,
    status: "queue" | "development" | "done",
    dueDate?: DateTime
  ) => {
    dispatch({
      type: "EDIT_TASK",
      payload: {
        id: id,
        taskName: taskName,
        status: status,
        description: description,
        dueDate: dueDate,
      },
    });
  };

  // ==========================LOCAL STORAGE===========================
  useLocalStorage("tasks", tasksStore, dispatch);

  // ==============================RENDER FASE===============================

  return (
    <>
      <AllModal
        size={"xl"}
        title={"Edit task"}
        onOpen={isOpen1}
        onClose={() => setIsOpen1(false)}
        children={
          <EditTask
            submit={() => setIsOpen1(false)}
            currentTask={currentTask}
            onEdit={(id, title, description, status, dueDate) =>
              onEdit(id, title, description, status, dueDate)
            }
          />
        }
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
              tasks={tasksOfTheCurrentProject.filter(
                (task) => task.status === "queue"
              )}
              addTask={() => addTask("queue")}
              currentProjectID={currentProject.id}
              columntName={"queue"}
              columntColor={"green.200"}
            />
            <Column
              onEdit={(id) => openModal(id)}
              onDelete={(id) => onDelete(id)}
              tasks={tasksOfTheCurrentProject.filter(
                (task) => task.status === "development"
              )}
              addTask={() => addTask("development")}
              currentProjectID={currentProject.id}
              columntName={"development"}
              columntColor={"purple.200"}
            />
            <Column
              onEdit={(id) => openModal(id)}
              onDelete={(id) => onDelete(id)}
              addTask={() => addTask("done")}
              tasks={tasksOfTheCurrentProject.filter(
                (task) => task.status === "done"
              )}
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
