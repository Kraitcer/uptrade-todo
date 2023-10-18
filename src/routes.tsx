import { createBrowserRouter } from "react-router-dom";
import ProjectsList from "./components/ProjectsList";
import ProjectsTasks from "./components/ProjectsTasks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProjectsList />,
  },
  { path: "/projectstaskbord", element: <ProjectsTasks /> },
]);

export default router;
