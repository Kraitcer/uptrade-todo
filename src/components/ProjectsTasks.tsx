import {
  Container,
  Flex,
  Heading,
  SimpleGrid,
  VStack,
  Text,
} from "@chakra-ui/react";

import { v4 } from "uuid";

import { useLocation, useNavigate } from "react-router-dom";
import { Projects } from "./ProjectsList";
import Column from "../UI Components/Column";

export interface Tasks {
  id: string;
  taskName: string;
  currentProject: string;
  status: "queue" | "development" | "done";
}

const ProjectsTasks = () => {
  let { state: currentProject } = useLocation();
  const tasksArray: Tasks[] = [
    {
      id: v4(),
      taskName: "task ONe",
      currentProject: currentProject.task,
      status: "queue",
    },
    {
      id: v4(),
      taskName: "task two",
      currentProject: currentProject.task,
      status: "queue",
    },
    {
      id: v4(),
      taskName: "task three",
      currentProject: currentProject.task,
      status: "development",
    },
    {
      id: v4(),
      taskName: "task four",
      currentProject: currentProject.task,
      status: "development",
    },
    {
      id: v4(),
      taskName: "five",
      currentProject: currentProject.task,
      status: "done",
    },
    {
      id: v4(),
      taskName: "six",
      currentProject: currentProject.task,
      status: "done",
    },
  ];
  return (
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
            columntColor={"green.200"}
            tasks={tasksArray.filter((task) => task.status === "queue")}
          />
          <Column
            columntColor={"purple.200"}
            tasks={tasksArray.filter((task) => task.status === "development")}
          />
          <Column
            columntColor={"pink.200"}
            tasks={tasksArray.filter((task) => task.status === "done")}
          />
        </SimpleGrid>
      </Flex>
    </VStack>
  );
};

export default ProjectsTasks;
