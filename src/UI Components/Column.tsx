import {
  Container,
  Flex,
  Heading,
  SimpleGrid,
  VStack,
  Text,
  Button,
  Badge,
} from "@chakra-ui/react";
import { Tasks } from "../components/ProjectsTasks";
import TaskPad from "./TaskPad";

interface ColumnProps {
  columntName: string;
  columntColor: string;
  tasks: Tasks[];
}

const Column = ({ columntName, columntColor, tasks }: ColumnProps) => {
  return (
    <Flex
      w={"560px"}
      //   h={"12rem"}
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
        <Button borderRadius={50} h={4} w={"100%"}>
          +
        </Button>
      </Flex>
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
