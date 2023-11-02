import { selectSubTasksOfTheCurrentTask } from "../../store/subTasksReducer";
import { GoTasklist } from "../../utilities/icons";

import { useSelector } from "react-redux";
import { Badge, Flex } from "@chakra-ui/react";

interface Props {
  currentTaskID: string;
}

const ActiveSubTaskBadge = ({ currentTaskID }: Props) => {
  const subTasksOfTheCurrentTask = useSelector(
    selectSubTasksOfTheCurrentTask(currentTaskID)
  );
  const activeSubTasks = subTasksOfTheCurrentTask.filter(
    (subTask) => !subTask.complited
  );
  return (
    <Flex alignItems={"center"} gap={1}>
      {activeSubTasks.length > 0 && <GoTasklist size={24} />}
      <Badge>{activeSubTasks.length > 0 && activeSubTasks.length}</Badge>
    </Flex>
  );
};

export default ActiveSubTaskBadge;
