import { GoTasklist } from "../../utilities/icons";
import { Badge, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SubTasks } from "../../pages/Tasks";

interface Props {
  currentTaskID: string;
}

const ActiveSubTaskBadge = ({ currentTaskID }: Props) => {
  const [activeSubTasks, setActiveSubTasks] = useState<SubTasks[]>([]);
  useEffect(() => {
    const storedData = localStorage.getItem("subTasks");
    if (storedData && storedData.length > 0) {
      const savedBadgesArray: SubTasks[] = JSON.parse(storedData);
      setActiveSubTasks(
        savedBadgesArray.filter(
          (sub) =>
            sub.currentTaskID === currentTaskID && sub.complited === false
        )
      );
    }
  }, [activeSubTasks]);
  return (
    <Flex alignItems={"center"} gap={1}>
      {activeSubTasks.length > 0 && <GoTasklist size={24} />}
      <Badge>{activeSubTasks.length > 0 && activeSubTasks.length}</Badge>
    </Flex>
  );
};

export default ActiveSubTaskBadge;
