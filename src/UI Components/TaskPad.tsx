import { Text, Box, Flex, HStack } from "@chakra-ui/react";
import {
  FaTrashRestoreAlt,
  IoTrashBinSharp,
  BiEdit,
  MdDone,
} from "../utilities/icons";

interface Props {
  width: string;
  task: any;
  onDelete: (id: string) => void;
  editTask: (id: string, name: string) => void;
  completeTask: (id: string) => void;
  // children: number;
}

export const TaskPad = ({
  task,
  onDelete,
  editTask,
  completeTask,
  width,
}: Props) => {
  return (
    <HStack gap={0} mr={0} mb={1} w={"100%"}>
      <Box
        bg={"blue.400"}
        color={"white"}
        w={width}
        h={10}
        p={1.5}
        pl={3}
        pr={2}
        borderLeftRadius={10}
        justifyContent={"center"}
        alignItems={"center"}
        // flexDirection={"raw"}
      >
        <Flex>
          <Text
            as={task.complited === true ? "del" : undefined}
            m={0}
            textOverflow={"ellipsis"}
            whiteSpace={"nowrap"}
            overflow={"hidden"}
          >
            {task.task}
          </Text>
        </Flex>
      </Box>
      <Flex>
        <Flex>
          <Flex
            bg={"orange.300"}
            h={10}
            w={"96px"}
            pt={3}
            pl={3}
            pr={3}
            gap={2}
            color={"white"}
            _hover={{ bg: "orange.400" }}
            borderRightRadius={10}
          >
            <BiEdit onClick={() => editTask(task.id, task.task)} />
            {task.complited ? (
              <FaTrashRestoreAlt onClick={() => completeTask(task.id)} />
            ) : (
              <MdDone onClick={() => completeTask(task.id)} />
            )}
            <IoTrashBinSharp onClick={() => onDelete(task.id)} />
          </Flex>
        </Flex>
      </Flex>
    </HStack>
  );
};

export default TaskPad;
