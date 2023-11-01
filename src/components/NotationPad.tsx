import { Text, Box, Flex, HStack } from "@chakra-ui/react";
import { DragPreviewImage, useDrag, useDrop } from "react-dnd";
import { dndItemsTypes } from "../utilities/dndItemsTypes";
import { useNavigate } from "react-router-dom";

import {
  FaTrashRestoreAlt,
  IoTrashBinSharp,
  BiEdit,
  MdDone,
  MdDragIndicator,
} from "../utilities/icons";
import { Projects } from "../pages/ProjectsList";

interface Props {
  width: string;
  project: Projects;
  onDelete: (id: string) => void;
  onEdit: (id: string, name: string) => void;
  onComplete: (id: string) => void;
  // moveItem: (fromIndex: number, toIndex: number) => void;
  index: number;
  // children: number;
}

export const NotationPad = ({
  width,
  project,
  onDelete,
  onEdit: editNotation,
  onComplete: completeNotation,
  // moveItem,
  index,
}: Props) => {
  // const [, ref] = useDrag({
  //   type: dndItemsTypes.PAD,
  //   item: { id: task.id },
  // });

  // const [, drop] = useDrop({
  //   accept: dndItemsTypes.PAD,
  //   hover: (draggedItem: { index: number }) => {
  //     if (draggedItem.index !== index) {
  //       moveItem(draggedItem.index, index);
  //       draggedItem.index = index;
  //     }
  //   },
  // });

  const navigate = useNavigate();

  return (
    <HStack
      gap={0}
      mr={0}
      mb={1}
      w={"100%"}
      //  ref={(node) => ref(drop(node))}
    >
      <Flex
        bg={"orange.300"}
        h={10}
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
        bg={"blue.400"}
        color={"white"}
        w={width}
        h={10}
        p={1.5}
        pl={3}
        pr={2}
        justifyContent={"center"}
        alignItems={"center"}
        cursor={"pointer"}
        onClick={() => navigate("/projectstaskbord", { state: project })}
        // flexDirection={"raw"}
      >
        <Flex>
          <Text
            as={project.complited === true ? "del" : undefined}
            m={0}
            textOverflow={"ellipsis"}
            whiteSpace={"nowrap"}
            overflow={"hidden"}
          >
            {project.projectName}
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
            <BiEdit
              onClick={() => editNotation(project.id, project.projectName)}
            />
            {project.complited ? (
              <FaTrashRestoreAlt onClick={() => completeNotation(project.id)} />
            ) : (
              <MdDone onClick={() => completeNotation(project.id)} />
            )}
            <IoTrashBinSharp onClick={() => onDelete(project.id)} />
          </Flex>
        </Flex>
      </Flex>
    </HStack>
  );
};

export default NotationPad;
