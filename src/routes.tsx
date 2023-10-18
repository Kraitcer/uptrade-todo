import { createBrowserRouter } from "react-router-dom";
import ProjectsList from "./components/ProjectsList";
import ProjectsTasks from "./components/ProjectsTasks";
// import HomePage from "./HomePage";
// import UserList from "./UserList";
// import UserDetail from "./UserDetail";
// import Layout from "./Layout";
// import Users from "./users";
// import ErrorPage from "./ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProjectsList />,
    // errorElement: <ErrorPage />,
  },
  { path: "/projectstaskbord", element: <ProjectsTasks /> },
  // {
  //   path: "/",
  //   element: <Layout />,
  //   errorElement: <ErrorPage />,
  //   children: [
  //     { index: true, element: <HomePage /> },
  //     {
  //       path: "users",
  //       element: <Users />,
  //       children: [{ path: ":id", element: <UserDetail /> }],
  //     },
  //   ],
  // },
]);

export default router;
