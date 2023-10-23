import { Container, Flex, Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { Projects } from "./ProjectsList";

const ProjectsTasks = () => {
  let { state: currentProject } = useLocation();
  console.log(currentProject);
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
      {/* <Container> */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, md: 4 }}>
        <Flex w={"560px"} h={"14rem"} bg={"orange.300"}>
          Queue
        </Flex>
        <Flex w={"560px"} h={"14rem"} bg={"blue.300"}>
          Development
        </Flex>
        <Flex w={"560px"} h={"14rem"} bg={"pink.300"}>
          Done
        </Flex>
      </SimpleGrid>
      {/* </Container> */}
    </VStack>
  );
};

export default ProjectsTasks;
