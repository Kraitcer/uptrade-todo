import { Input, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";

interface Props {
  subTasks: any;
  editSubTask: (subTaskValue: any, id: string) => void;
}

export const EditNotation = ({ subTasks, editSubTask }: Props) => {
  const [value, setValue] = useState(subTasks.task);

  const handleSubmit = (e: any) => {
    // prevent default action
    e.preventDefault();
    // edit todo
    editSubTask(subTasks.id, value);
  };
  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <Flex w={"88%"}>
        <Input
          bg={"white"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          borderLeftRadius={10}
          borderRightRadius={0}
        />
        <Flex
          bg={"orange.300"}
          h={10}
          w={"75px"}
          pt={2}
          pl={4}
          // pr={3}
          gap={2}
          color={"white"}
          _hover={{ bg: "orange.400" }}
          borderRightRadius={10}
        >
          <AiOutlinePlusCircle size="1.5rem" onClick={handleSubmit} />
        </Flex>
        {/* <button type="submit" className="todo-btn">
          Add Task
        </button> */}
      </Flex>
    </form>
  );
};

export default EditNotation;
