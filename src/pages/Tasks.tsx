import { Flex, Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import { DateTime } from "luxon";
import { v4 } from "uuid";
import { useLocation } from "react-router-dom";
import { useEffect, useMemo, useReducer, useState } from "react";
import Column from "../components/Column";
import AllModal from "../components/AllModal";
import EditTask from "../components/EditTask";
import { tasksReducer } from "../store/tasksReducer";
import { useLocalStorage } from "../hooks/useLocalStorage";
import React from "react";

export interface TasksStatus {
  status: "queue" | "development" | "done";
}
export interface Tasks {
  id: string;
  taskName: string;
  currentProjectID: string;
  status: TasksStatus["status"];
  description: string;
  creationDate: string;
  timeSpent: string;
  dueDate?: string;
}
export interface SubTasks {
  id: string;
  subTaskName: string;
  currentTaskID: string;
  isEditing: boolean;
  complited: boolean;
}

const ProjectsTasks = React.memo(() => {
  let { state: currentProject } = useLocation();
  const [tasksStore, dispatch] = useReducer(tasksReducer, []);
  // const [today, setToday] = useState<DateTime>();

  // console.log(tasksStore);

  // ==============================TODAY===============================
  // useEffect(() => {
  //   setToday(DateTime.now());
  // }, [tasksStore]);

  // ==============================TASK FILTER=========================
  const tasksOfTheCurrentProject = tasksStore.filter(
    (task) => task.currentProjectID === currentProject.id
  );

  // ==============================COLUMNS=============================
  const columnsArray: {
    status: TasksStatus["status"];
    columntColor: string;
  }[] = [
    { status: "queue", columntColor: "green.200" },
    { status: "development", columntColor: "purple.200" },
    { status: "done", columntColor: "pink.200" },
  ];

  // ==============================MODAL=============================
  const [isOpen1, setIsOpen1] = useState(false);
  const [currentTask, setCurrentTask] = useState({} as Tasks);

  const openModal = (id: string) => {
    const currentTask = tasksStore.filter((task) => task.id === id);
    setCurrentTask(currentTask[0]);
    setIsOpen1(true);
  };

  // ==============================ADD=============================
  const addTask = (status: TasksStatus["status"]) => {
    // console.log(`task with ${status}`);
    dispatch({
      type: "ADD_TASK",
      payload: {
        id: v4(),
        taskName: `new ${status} Task`,
        currentProjectID: currentProject.id,
        status: status,
        description: "",
        creationDate: DateTime.now().toFormat("yyyy-MM-dd"),
        timeSpent: "",
        dueDate: "",
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
    status: TasksStatus["status"],
    dueDate?: string
  ) => {
    dispatch({
      type: "EDIT_TASK",
      payload: {
        id,
        taskName,
        status,
        description,
        dueDate,
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
            onEdit={onEdit}
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
            {columnsArray.map((column, index) => (
              <Column
                key={index}
                onEdit={openModal}
                onDelete={onDelete}
                // today={today}
                tasks={tasksOfTheCurrentProject.filter(
                  (task) => task.status === column.status
                )}
                addTask={() => addTask(column.status)}
                currentProjectID={currentProject.id}
                columntName={column.status}
                columntColor={column.columntColor}
              />
            ))}
          </SimpleGrid>
        </Flex>
      </VStack>
    </>
  );
});

export default ProjectsTasks;
