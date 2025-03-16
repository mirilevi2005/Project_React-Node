import { createBrowserRouter } from "react-router";
import AppLayout from "../components/AppLayout";
import HomePage from "../pages/HomeLacturer";
import NotFound from "../pages/NotFound";
import Ai from "../pages/Ai";
import CyberSecurity from "../pages/CyberSecurity";
import CloudComputing from "../pages/CloudComputing";


const router = createBrowserRouter([
  { element: <AppLayout/>,
    children: [
      {  element: <HomePage/>,index: true, },
       {path: "ai", element: <Ai/>},
       {path: "CyberSecurity", element: <CyberSecurity/>},
       {path: "CloudComputing", element: <CloudComputing/>},
      {  path: "*", element: <NotFound />,      },
    ],
  },
]);


export default router;



