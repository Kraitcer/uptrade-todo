import {
  Container,
  Flex,
  Heading,
  SimpleGrid,
  VStack,
  Text,
  Button,
} from "@chakra-ui/react";
import { Tasks } from "../components/ProjectsTasks";
import TaskPad from "./TaskPad";

interface ColumnProps {
  columntColor: string;
  tasks: Tasks[];
}

const Column = ({ columntColor, tasks }: ColumnProps) => {
  return (
    <Flex
      w={"560px"}
      h={"12rem"}
      borderRadius={20}
      bg={columntColor}
      flexDirection={"column"}
      alignItems={"center"}
      p={3}
      gap={3}
    >
      <Button borderRadius={50} h={4} w={"90%"}>
        +
      </Button>
      <Flex
        w={"100%"}
        h={"100%"}
        flexDirection={{ base: "row", md: "column" }}
        gap={3}
      >
        {tasks.map((task, index) => (
          <TaskPad key={index}>{task.taskName}</TaskPad>
        ))}
      </Flex>
    </Flex>
  );
};

export default Column;
