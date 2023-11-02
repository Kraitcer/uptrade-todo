import {
  selectQueueTasks,
  selectDevelopmentTasks,
  selectDoneTasks,
} from "../../store/tasksReducer";
import { useSelector } from "react-redux";
import { Flex, Badge } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface Props {
  currentProjectID: string;
}

const TasksBadge = ({ currentProjectID }: Props) => {
  const navigate = useNavigate();

  const queueTasks = useSelector(selectQueueTasks).filter(
    (task) => task.currentProjectID === currentProjectID
  );
  const developmentTasks = useSelector(selectDevelopmentTasks).filter(
    (task) => task.currentProjectID === currentProjectID
  );
  const doneTasks = useSelector(selectDoneTasks).filter(
    (task) => task.currentProjectID === currentProjectID
  );

  const badgesArray: {
    badgeName: string;
    badgeColor: string;
    badgeContent: number;
  }[] = [
    {
      badgeName: "queue",
      badgeColor: "green.200",
      badgeContent: queueTasks.length,
    },
    {
      badgeName: "developmentTasks",
      badgeColor: "purple.200",
      badgeContent: developmentTasks.length,
    },
    {
      badgeName: "done",
      badgeColor: "pink.200",
      badgeContent: doneTasks.length,
    },
  ];

  return (
    <Flex
      gap={2}
      _hover={{ bg: "white" }}
      p={1}
      borderRadius={50}
      onClick={() => navigate("/projectstaskbord", { state: currentProjectID })}
    >
      {badgesArray.map((badge, index) => (
        <Badge
          key={index}
          //   pt={0.5}
          bg={badge.badgeColor}
          borderRadius={50}
          w={6}
          display={"flex"}
          alignContent={"center"}
          justifyContent={"center"}
          textAlign={"center"}
        >
          {badge.badgeContent}
        </Badge>
      ))}
    </Flex>
  );
};

export default TasksBadge;
