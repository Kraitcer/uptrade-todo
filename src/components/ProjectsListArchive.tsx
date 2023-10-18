import { useState } from "react";
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

export interface Projects {
  id: string;
  task: string;
  isEditing: boolean;
  active: boolean;
  complited: boolean;
}

const ProjectsList = () => {
  const [projects, setProjects] = useState<Projects[]>([]);

  const [renderFilter, setRenderFilter] = useState("all");

  const visibleProjects =
    renderFilter === "all"
      ? projects
      : renderFilter === "active"
      ? projects.filter((t) => t.active === true)
      : projects.filter((t) => t.complited === true);

  // =================================EDIT=============================

  const editProject = (id: string, currentTaskName: string) => {
    setProjects(
      projects.map((project) =>
        project.id === id
          ? { ...project, isEditing: !project.isEditing, task: currentTaskName }
          : project
      )
    );
  };
  // ==============================COMPLETE=============================
  const completeProject = (id: string) => {
    setProjects(
      projects.map((project) =>
        project.id === id
          ? {
              ...project,
              complited: !project.complited,
              active: !project.active,
            }
          : project
      )
    );
  };
  const completedTask = projects.filter((t: Projects) => t.complited == true);

  // ==============================DELETE=============================
  const deleteProject = (id: string) => {
    const newProjects = projects.filter((project) => project.id !== id);
    setProjects(newProjects);
  };

  // ==============================ADD=============================
  const addProject = (project: any) => {
    setProjects([
      {
        id: uuidv4(),
        task: project,
        isEditing: false,
        active: true,
        complited: false,
      },
      ...projects,
    ]);
  };

  const activeTask = projects.filter((t: Projects) => t.active == true);

  return (
    <>
      <VStack gap={0}>
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
                  width={"76%"}
                  onDelete={deleteProject}
                  key={index}
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
    </>
  );
};

export default ProjectsList;
