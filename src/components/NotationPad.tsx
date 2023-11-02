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
  notationID: string;
  notationName: string;
  complited: boolean;
  onDelete: (id: string) => void;
  onEdit: (id: string, name: string) => void;
  onComplete: (id: string) => void;
  // moveItem: (fromIndex: number, toIndex: number) => void;
  index: number;
  // children: number;
}

export const NotationPad = ({
  width,
  notationID,
  notationName,
  complited,
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
        onClick={() => navigate("/projectstaskbord", { state: notationID })}
        // flexDirection={"raw"}
      >
        <Flex>
          <Text
            as={complited === true ? "del" : undefined}
            m={0}
            textOverflow={"ellipsis"}
            whiteSpace={"nowrap"}
            overflow={"hidden"}
          >
            {notationName}
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
            <BiEdit onClick={() => editNotation(notationID, notationName)} />
            {complited ? (
              <FaTrashRestoreAlt onClick={() => completeNotation(notationID)} />
            ) : (
              <MdDone onClick={() => completeNotation(notationID)} />
            )}
            <IoTrashBinSharp onClick={() => onDelete(notationID)} />
          </Flex>
        </Flex>
      </Flex>
    </HStack>
  );
};

export default NotationPad;
