// import { createBrowserRouter } from "react-router";
// import AppLayout from "../components/AppLayout";
// import NotFound from "../pages/NotFound";
// import Ai from "../pages/Ai";
// import CyberSecurity from "../pages/CyberSecurity";
// import CloudComputing from "../pages/CloudComputing";
// import HomeLacturer from "../pages/HomeLacturer";

// const router = createBrowserRouter([
//   { element: <AppLayout/>,
//     children: [
//       {index:true,  path: '/',element:<HomeLacturer/>},
//       {path:"HomeLacturer",
//         children:[
//           {index:true,element:<HomeLacturer/>},
//           {path: "Ai", element: <Ai/>},
//           {path: "CyberSecurity", element: <CyberSecurity/>},
//           {path: "CloudComputing", element: <CloudComputing/>},
//         ]
//       },
//       {  path: "*", element: <NotFound />,      },
//     ],
//   },
// ]);


// export default router;



import { createBrowserRouter, RouteObject } from "react-router";
import AppLayout from "../components/AppLayout";
import NotFound from "../pages/NotFound";
import Ai from "../pages/Ai";
import CyberSecurity from "../pages/CyberSecurity";
import CloudComputing from "../pages/CloudComputing";
import HomeLacturer from "../pages/HomeLacturer";

const routes: RouteObject[] = [
  {
    element: <AppLayout />,
    children: [
      { index: true, path: '/', element: <HomeLacturer /> },
      {
        path: "HomeLacturer",
        children: [
          { index: true, element: <HomeLacturer /> },
          { path: "Ai", element: <Ai /> },
          { path: "CyberSecurity", element: <CyberSecurity /> },
          { path: "CloudComputing", element: <CloudComputing /> },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;



