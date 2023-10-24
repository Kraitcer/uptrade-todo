import {
  Container,
  Flex,
  Heading,
  SimpleGrid,
  VStack,
  Text,
  Button,
  Box,
  HStack,
} from "@chakra-ui/react";
import {
  FaTrashRestoreAlt,
  IoTrashBinSharp,
  BiEdit,
  MdDone,
  MdDragIndicator,
} from "../utilities/icons";
import { Tasks } from "../components/ProjectsTasks";

interface Prop {
  task: Tasks;
  children: React.ReactNode;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const TaskPad = ({ children, onDelete, onEdit, task }: Prop) => {
  return (
    <HStack gap={0} mr={0} h={16}>
      <Flex
        bg={"orange.300"}
        h={"100%"}
        w={"36px"}
        gap={2}
        color={"white"}
        _hover={{ bg: "orange.400" }}
        borderLeftRadius={10}
        justifyContent={"center"}
        alignItems={"center"}
        cursor={"-webkit-grab"}
      >
        <MdDragIndicator size={"20px"} />
      </Flex>
      <Box
        h={"100%"}
        bg={"blue.400"}
        color={"white"}
        w={"100%"}
        p={1.5}
        pl={3}
        pr={2}
        justifyContent={"center"}
        alignItems={"center"}
        cursor={"pointer"}
        // onClick={() => navigate("/projectstaskbord", { state: task })}
        // flexDirection={"raw"}
      >
        <Flex w={"404px"}>
          <Text
            // as={task.complited === true ? "del" : undefined}
            m={0}
            textOverflow={"ellipsis"}
            whiteSpace={"nowrap"}
            overflow={"hidden"}
          >
            {children}
          </Text>
        </Flex>
      </Box>
      <Flex h={"100%"}>
        <Flex>
          <Flex
            bg={"orange.300"}
            w={"70px"}
            pt={3}
            pl={3}
            pr={3}
            gap={2}
            color={"white"}
            _hover={{ bg: "orange.400" }}
            borderRightRadius={10}
          >
            <BiEdit onClick={() => onEdit(task.id)} />
            <IoTrashBinSharp onClick={() => onDelete(task.id)} />
          </Flex>
        </Flex>
      </Flex>
    </HStack>
  );

  //   <div></div>;
};

export default TaskPad;
