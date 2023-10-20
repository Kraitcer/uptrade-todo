import { useEffect, useReducer, useState } from "react";
import { Flex, VStack, Text } from "@chakra-ui/react";
import { projectsReducer } from "../store/projectsReducer";
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

export interface Projects {
  id: string;
  task: string;
  isEditing: boolean;
  active: boolean;
  complited: boolean;
}

const ProjectsList = () => {
  const [projects, dispatch] = useReducer(projectsReducer, [] as Projects[]);

  const [renderFilter, setRenderFilter] = useState("all");

  const visibleProjects =
    renderFilter === "all"
      ? projects
      : renderFilter === "active"
      ? projects.filter((t) => t.active === true)
      : projects.filter((t) => t.complited === true);

  // =================================EDIT=============================

  const editProject = (id: string, currentTaskName: string) => {
    dispatch({
      type: "EDIT_PROJECT",
      payload: { id: id, task: currentTaskName },
    });
  };
  // ==============================COMPLETE=============================
  const completeProject = (id: string) => {
    dispatch({ type: "COMPLETE_PROJECT", payload: id });
  };
  const completedTask = projects.filter((t: Projects) => t.complited == true);

  // ==============================DELETE=============================
  const deleteProject = (id: string) => {
    dispatch({ type: "DELETE_PROJECT", payload: id });
    // const newProjects = projects.filter((project) => project.id !== id);
  };

  // ==============================ADD=============================
  const addProject = (project: string) => {
    dispatch({ type: "ADD_PROJECT", payload: { task: project } });
  };

  const activeTask = projects.filter((t: Projects) => t.active == true);

  // ==============================LOCAL STORAGE=============================

  useEffect(() => {
    if (projects.length > 0)
      localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    const storedProjects = localStorage.getItem("projects");
    if (storedProjects && storedProjects.length > 0) {
      const parsedProjects = JSON.parse(storedProjects);
      dispatch({ type: "SET_PROJECTS", payload: parsedProjects });
    }
  }, [dispatch]);

  // ==============================PROJECTS MOOVING ITEMS=====================
  const moveItem = (fromIndex: number, toIndex: number) => {
    const updatedList = [...projects];
    const [movedItem] = updatedList.splice(fromIndex, 1);
    updatedList.splice(toIndex, 0, movedItem);
    dispatch({ type: "SET_PROJECTS", payload: updatedList });
  };
  // ==============================RENDER FASE===============================
  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      w={"100%"}
    >
      <Text fontSize={60} mb={2}>
        Projects List
      </Text>
      <VStack gap={0} mt={6}>
        <AddProject
          addTodo={addProject}
          placeHolder="Choose New Project"
          buttonName="Add"
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
            {visibleProjects.map((project, index) =>
              project.isEditing ? (
                <EditProject
                  key={index}
                  notation={project}
                  onEdit={(id: string, name: string) => editProject(id, name)}
                />
              ) : (
                <ProjectPad
                  width={"73%"}
                  onDelete={deleteProject}
                  key={project.id}
                  index={index}
                  moveItem={moveItem}
                  task={project}
                  onEdit={(id: string, name: string) => editProject(id, name)}
                  onComplete={(id: string) => completeProject(id)}
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
            badge={projects.length}
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
    </Flex>
  );
};

export default ProjectsList;
