import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Flex, VStack } from "@chakra-ui/layout";
import {
  MdDone,
  MdOutlineNotificationsActive,
  AiOutlineUnorderedList,
} from "../utilities/icons";
import {
  AddNotation as AddProject,
  NotationPad as ProjectPad,
  EditNotation as EditProject,
  Footer,
} from "../utilities/uicomponents";
// import useTodos, { Todo } from "../hooks/useTodos";
// import axios from "axios";
// import useOldTodos from "../hooks/useOldTodos";

export interface OldTodos {
  title: string;
  complited: boolean;
  id?: number;
  userId?: number;
  isEditing: boolean;
}

interface todos {
  id: string;
  task: string;
  isEditing: boolean;
  active: boolean;
  complited: boolean;
}

const ProjectsList = () => {
  // const { data: oldTodos } = useOldTodos();
  // useEffect(() => {
  //   setTodos(
  //     oldTodos.map((arr: any) => ({
  //       id: uuidv4(),
  //       task: arr.title,
  //       isEditing: false,
  //       active: true,
  //       complited: arr.complited,
  //     }))
  //   );
  // }, []);
  // const { data: oldTodos } = useTodos<Todo>([]);
  const [todos, setTodos] = useState<todos[]>([]);

  // console.log(todos);

  const [renderFilter, setRenderFilter] = useState("all");

  const visibleTodos =
    renderFilter === "all"
      ? todos
      : renderFilter === "active"
      ? todos.filter((t) => t.active === true)
      : todos.filter((t) => t.complited === true);

  // ========================================================EDIT=============================

  const editTodo = (id: string, currentTaskName: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, isEditing: !todo.isEditing, task: currentTaskName }
          : todo
      )
    );
  };
  // ========================================================COMPLETE=============================
  const completeTask = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, complited: !todo.complited, active: !todo.active }
          : todo
      )
    );
  };
  const completedTask = todos.filter((t: todos) => t.complited == true);

  // ========================================================DELETE=============================
  const deleteTask = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  // ========================================================ADD=============================
  const addTodo = (todo: any) => {
    setTodos([
      {
        id: uuidv4(),
        task: todo,
        isEditing: false,
        active: true,
        complited: false,
      },
      ...todos,
    ]);
    // console.log(todos);
  };

  const activeTask = todos.filter((t: todos) => t.active == true);

  return (
    <>
      <VStack gap={0}>
        <AddProject
          addTodo={addTodo}
          placeHolder="Choose New Task"
          buttonName="Add Task"
        />
        <Flex w={"560px"} h={"34rem"} mb={0}>
          <Flex
            flexDirection={"column"}
            overflowY={"auto"}
            bg={"blue.100"}
            w={"100%"}
            h={"100%"}
            borderTopRadius={20}
            gap={2}
            pl={3}
            pt={3}
            pb={2}
          >
            {visibleTodos.map((todo, index) =>
              todo.isEditing ? (
                <EditProject
                  key={index}
                  subTasks={todo}
                  editSubTask={(id: string, name: string) => editTodo(id, name)}
                />
              ) : (
                <ProjectPad
                  width={"76%"}
                  onDelete={deleteTask}
                  key={index}
                  task={todo}
                  editTask={(id: string, name: string) => editTodo(id, name)}
                  completeTask={(id: string) => completeTask(id)}
                />
              )
            )}
          </Flex>
        </Flex>
        <Flex
          bg={"blue.400"}
          w={"100%"}
          h={16}
          borderBottomRadius={20}
          justifyContent={"center"}
          alignItems={"center"}
          gap={3}
        >
          <Footer
            onClick={() => setRenderFilter("all")}
            badge={todos.length}
            icon={<AiOutlineUnorderedList size={22} />}
            name={"all"}
          />
          <Footer
            onClick={() => setRenderFilter("active")}
            badge={activeTask.length}
            icon={<MdOutlineNotificationsActive size={22} />}
            name={"active"}
          />
          <Footer
            onClick={() => setRenderFilter("completed")}
            badge={completedTask.length}
            icon={<MdDone size={22} />}
            name={"completed"}
          />
        </Flex>
      </VStack>
    </>
  );
};

export default ProjectsList;
