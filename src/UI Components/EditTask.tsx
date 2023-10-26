import React, { useReducer, useState } from "react";
import {
  Input,
  Flex,
  Text,
  Textarea,
  VStack,
  Button,
  Select,
} from "@chakra-ui/react";

import { DateTime, Zone } from "luxon";

import { Tasks } from "../components/Tasks";

interface Props {
  submit: () => void;
  currentTask: Tasks;
  onEdit: (
    id: string,
    taskName: string,
    description: string,
    status: "queue" | "development" | "done",
    dueDate: DateTime
  ) => void;
}

const EditTask = ({ currentTask, onEdit, submit }: Props) => {
  const [title, setTitle] = useState(currentTask.taskName);
  const [description, setDescription] = useState(currentTask.description);
  const [status, setStatus] = useState(currentTask.status);
  const [dueDate, setDueDate] = useState(currentTask.dueDate);
  // console.log("creationDate", currentTask.creationDate);
  // console.log("dueDate", currentTask.dueDate?.toFormat("yyyy-MM-dd"));
  // console.log(DateTime.fromFormat(dueDate, "string"));
  const handleSubmit = (e: any) => {
    e.preventDefault();
    onEdit(currentTask.id, title, description, status, dueDate);
    submit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex gap={2} flexDirection={"column"}>
        <Flex gap={4}>
          <Text textTransform={"uppercase"} fontSize={"2xl"}>
            Title
          </Text>
          <Input
            m={0}
            bg={"white"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Flex>
        <Flex gap={4}>
          <Text textTransform={"uppercase"} fontSize={"2xl"}>
            description
          </Text>
          <Textarea
            m={0}
            bg={"white"}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            resize={"none"}
          />
        </Flex>
        <Flex gap={4}>
          <Text textTransform={"uppercase"} fontSize={"2xl"}>
            status
          </Text>
          <Select
            value={status}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setStatus(e.target.value as "queue" | "development" | "done")
            }
          >
            <option value="queue">queue</option>
            <option value="development">development</option>
            <option value="done">done</option>
          </Select>
        </Flex>
        <Flex gap={4} justifyContent={"space-between"}>
          <Text textTransform={"uppercase"} fontSize={"2xl"}>
            creation Date
          </Text>
          <Text textTransform={"uppercase"} fontSize={"2xl"}>
            {currentTask.creationDate.day}
            {currentTask.creationDate.monthShort}
          </Text>
        </Flex>
        <Flex gap={4} justifyContent={"space-between"}>
          <Text textTransform={"uppercase"} fontSize={"2xl"}>
            Due Date
          </Text>
          <Input
            type="date"
            w={400}
            value={dueDate.toFormat("yyyy-MM-dd")}
            onChange={(e) => setDueDate(DateTime.fromISO(e.target.value))}
          />
        </Flex>

        <Button bg={"blue.400"} color={"white"} onClick={handleSubmit}>
          SUBMIT
        </Button>
      </Flex>
    </form>
  );
};

export default EditTask;
