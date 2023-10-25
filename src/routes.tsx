import { createBrowserRouter } from "react-router-dom";
import ProjectsList from "./components/ProjectsList";
import ProjectsTasks from "./components/Tasks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProjectsList />,
  },
  { path: "/projectstaskbord", element: <ProjectsTasks /> },
]);

export default router;
