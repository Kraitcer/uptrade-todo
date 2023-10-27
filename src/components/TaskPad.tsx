import { Flex, Text, Box, HStack, Badge } from "@chakra-ui/react";
import {
  IoTrashBinSharp,
  BiEdit,
  MdDragIndicator,
  GiSandsOfTime,
} from "../utilities/icons";
import { Tasks } from "../pages/Tasks";

interface Prop {
  task: Tasks;
  onDelete: (id: string) => void;

  onEdit: (id: string) => void;
}

const TaskPad = ({ onEdit, onDelete, task }: Prop) => {
  //   const timeLeft = task.dueDate?.diff(task.creationDate, "days").toObject();
  //   console.log(timeLeft);

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
      >
        <Flex w={"404px"}>
          <Flex w={"100%"} flexDirection={"column"} gap={2}>
            <Text
              m={0}
              textOverflow={"ellipsis"}
              whiteSpace={"nowrap"}
              overflow={"hidden"}
            >
              {task.taskName}
            </Text>
            <Flex gap={1} flexDirection={"row-reverse"} alignItems={"center"}>
              <Badge>
                {/* {task.dueDate && task.dueDate?.toFormat("yyyy-MM-dd")} */}
              </Badge>
              <GiSandsOfTime />
            </Flex>
          </Flex>
        </Flex>
      </Box>
      <Flex h={"100%"}>
        <Flex>
          <Flex
            bg={"orange.300"}
            w={"70px"}
            // pt={3}
            pl={3}
            gap={2}
            color={"white"}
            _hover={{ bg: "orange.400" }}
            borderRightRadius={10}
            alignItems={"center"}
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
