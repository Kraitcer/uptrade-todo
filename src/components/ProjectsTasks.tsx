import { Flex, Heading, SimpleGrid, VStack } from "@chakra-ui/react";

import { useLocation } from "react-router-dom";
import Column from "../UI Components/Column";
import AllModal from "./AllModal";
import { useState } from "react";

export interface TasksStatus {
  status: "queue" | "development" | "done";
}
export interface Tasks {
  id: string;
  taskName: string;
  currentProjectID: string;
  status: "queue" | "development" | "done";
}

const ProjectsTasks = () => {
  let { state: currentProject } = useLocation();

  return (
    <>
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
              currentProjectID={currentProject.id}
              columntName={"queue"}
              columntColor={"green.200"}
            />
            <Column
              currentProjectID={currentProject.id}
              columntName={"development"}
              columntColor={"purple.200"}
            />
            <Column
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
