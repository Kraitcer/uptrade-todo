import { Flex, Badge } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface Props {
  currentProjectID: string;
  currentProjectName: string;
}

const TasksBadge = ({ currentProjectID, currentProjectName }: Props) => {
  const navigate = useNavigate();
  const [queueTasks, setQueueTasks] = useState([]);
  const [developmentTasks, setDevelopmentTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);

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
      badgeName: "development",
      badgeColor: "purple.200",
      badgeContent: developmentTasks.length,
    },
    {
      badgeName: "done",
      badgeColor: "pink.200",
      badgeContent: doneTasks.length,
    },
  ];

  useEffect(() => {
    const storedData = localStorage.getItem("tasks");
    if (storedData && storedData.length > 0) {
      const savedBadgesArray = JSON.parse(storedData);
      setQueueTasks(
        savedBadgesArray.filter(
          (task: any) =>
            task.currentProjectID === currentProjectID &&
            task.status === "queue"
        )
      );
      setDevelopmentTasks(
        savedBadgesArray.filter(
          (task: any) =>
            task.currentProjectID === currentProjectID &&
            task.status === "development"
        )
      );
      setDoneTasks(
        savedBadgesArray.filter(
          (task: any) =>
            task.currentProjectID === currentProjectID && task.status === "done"
        )
      );
    }
  }, []);

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
