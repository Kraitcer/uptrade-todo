import { createBrowserRouter } from "react-router-dom";
import ProjectsList from "./components/ProjectsList";
import Tasks from "./components/Tasks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProjectsList />,
  },
  { path: "/projectstaskbord", element: <Tasks /> },
]);

export default router;
