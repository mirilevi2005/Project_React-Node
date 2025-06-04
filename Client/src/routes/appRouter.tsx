import { createBrowserRouter, RouteObject } from "react-router";
import AppLayout from "../components/AppLayout";
import NotFound from "../pages/NotFound";
import Ai from "../pages/material/Ai";
import CyberSecurity from "../pages/material/CyberSecurity";
import CloudComputing from "../pages/material/CloudComputing";
import SignUp from "../components/auth/SignUp"; 
import SignIn from "../components/auth/SignIn";
import HomePage from "../components/home/HomePage";

const routes: RouteObject[] = [
  {
    element: <AppLayout />,
    children: [
      { index: true, path: '/', element: <SignIn /> },
      { path: "SignUp", element: <SignUp /> },
      {
        path: "HomeLecturer",
        children: [
          { index: true, element:<HomePage/>},
          { path: "Ai", element: <Ai /> },
          { path: "CyberSecurity", element: <CyberSecurity /> },
          { path: "CloudComputing", element: <CloudComputing /> },
        ],
      },
      { path: "HomeStudent",
        children:
        [
          { index: true, element:<HomePage/>},
          { path: "Ai", element: <Ai /> },
          { path: "CyberSecurity", element: <CyberSecurity /> },
          { path: "CloudComputing", element: <CloudComputing /> },
        ]
       },
      { path: "*", element: <NotFound /> },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;



