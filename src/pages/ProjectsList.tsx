import { useState } from "react";
import { Flex, VStack, Heading } from "@chakra-ui/react";
import {
  addProject,
  editProject,
  completeProject,
  deleteProject,
  selectAllProjects,
  selectCompletedProjects,
  selectActiveProjects,
} from "../store/projectsReducer";

import store from "../store/store";
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
} from "../components/componentsList";
import { useSelector } from "react-redux";
import { useLocalStorage } from "../hooks/useLocalStorage";
import TasksBadge from "../components/badges/TasksBadge";

export interface Projects {
  id: string;
  projectName: string;
  isEditing: boolean;
  active: boolean;
  complited: boolean;
}

const ProjectsList = () => {
  const projects = useSelector(selectAllProjects);
  const completeProjects = useSelector(selectCompletedProjects);
  const activeProjects = useSelector(selectActiveProjects);

  const [renderFilter, setRenderFilter] = useState("all");

  const visibleProjects =
    renderFilter === "all"
      ? projects
      : renderFilter === "active"
      ? activeProjects
      : completeProjects;
  // =================================ADD=============================
  const addProjectToStore = (project: string) => {
    store.dispatch(addProject(project));
  };
  // =================================EDIT=============================

  const editProjectOut = (id: string, currentTaskName: string) => {
    store.dispatch(editProject(id, currentTaskName));
  };

  // ==============================COMPLETE=============================
  const completeProjectOut = (id: string) => {
    store.dispatch(completeProject(id));
  };

  // ==============================DELETE=============================
  const deleteProjectOut = (id: string) => {
    store.dispatch(deleteProject(id));
  };

  // ==============================LOCAL STORAGE=============================

  useLocalStorage("projects", projects, store.dispatch);

  // ==============================PROJECTS MOOVING ITEMS=====================
  // const moveItem = (fromIndex: number, toIndex: number) => {
  //   const updatedList = [...projects];
  //   const [movedItem] = updatedList.splice(fromIndex, 1);
  //   updatedList.splice(toIndex, 0, movedItem);
  //   dispatch({ type: "SET_PROJECTS", payload: updatedList });
  // };
  // ==============================RENDER FASE===============================
  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      w={"100%"}
    >
      <Heading
        fontSize={{ base: "4xl", sm: "5xl", md: "6xl" }}
        fontWeight="bold"
        textAlign="center"
        textTransform={"uppercase"}
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
        mt={4}
      >
        Projects
      </Heading>
      <VStack gap={0} mt={6}>
        <AddProject
          addTodo={addProjectToStore}
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
            pr={3}
            pt={3}
            pb={2}
          >
            {visibleProjects.map((project, index) =>
              project.isEditing ? (
                <EditProject
                  key={index}
                  notationID={project.id}
                  notationName={project.projectName}
                  onEdit={editProjectOut}
                />
              ) : (
                <ProjectPad
                  nameWidth={"300px"}
                  children={
                    <TasksBadge
                      currentProjectID={project.id}
                      currentProjectName={project.projectName}
                    />
                  }
                  width={"100%"}
                  onDelete={deleteProjectOut}
                  key={project.id}
                  index={index}
                  // moveItem={moveItem}
                  notationID={project.id}
                  notationName={project.projectName}
                  complited={project.complited}
                  onEdit={editProjectOut}
                  onComplete={completeProjectOut}
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
            badge={activeProjects.length}
            icon={<MdOutlineNotificationsActive size={22} />}
            name={"active"}
          />
          <Footer
            onClick={() => setRenderFilter("completed")}
            badge={completeProjects.length}
            icon={<MdDone size={22} />}
            name={"completed"}
          />
        </Flex>
      </VStack>
    </Flex>
  );
};

export default ProjectsList;
