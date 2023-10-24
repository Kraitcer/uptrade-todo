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
  currentProjectID: string;
  status: "queue" | "development" | "done";
}

const ProjectsTasks = () => {
  let { state: currentProject } = useLocation();
  const tasksArray: Tasks[] = [
    {
      id: v4(),
      taskName: "task ONe",
      currentProjectID: currentProject.id,
      status: "queue",
    },
    {
      id: v4(),
      taskName: "task two",
      currentProjectID: currentProject.id,
      status: "queue",
    },
    {
      id: v4(),
      taskName: "task three",
      currentProjectID: currentProject.id,
      status: "development",
    },
    {
      id: v4(),
      taskName: "task four",
      currentProjectID: currentProject.id,
      status: "development",
    },
    {
      id: v4(),
      taskName: "five",
      currentProjectID: currentProject.id,
      status: "done",
    },
    {
      id: v4(),
      taskName: "six",
      currentProjectID: currentProject.id,
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
            columntName={"queue"}
            columntColor={"green.200"}
            tasks={tasksArray.filter((task) => task.status === "queue")}
          />
          <Column
            columntName={"development"}
            columntColor={"purple.200"}
            tasks={tasksArray.filter((task) => task.status === "development")}
          />
          <Column
            columntName={"done"}
            columntColor={"pink.200"}
            tasks={tasksArray.filter((task) => task.status === "done")}
          />
        </SimpleGrid>
      </Flex>
    </VStack>
  );
};

export default ProjectsTasks;
