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



// import { createBrowserRouter, RouteObject } from "react-router";
// import AppLayout from "../components/AppLayout";
// import NotFound from "../pages/NotFound";
// import Ai from "../pages/Ai";
// import CyberSecurity from "../pages/CyberSecurity";
// import CloudComputing from "../pages/CloudComputing";
// import HomeLacturer from "../pages/HomeLacturer";
// import SignIn from "../components/SignIn";

// const routes: RouteObject[] = [
//   {
//     element: <AppLayout />,
//     children: [
//       { index: true, path: '/', element: <SignIn /> },
//       {
//         path: "HomeLacturer",
//         children: [
//           { index: true, element: <HomeLacturer /> },
//           { path: "Ai", element: <Ai /> },
//           { path: "CyberSecurity", element: <CyberSecurity /> },
//           { path: "CloudComputing", element: <CloudComputing /> },
//         ],
//       },
//       { path: "*", element: <NotFound /> },
//     ],
//   },
// ];

// const router = createBrowserRouter(routes);

// export default router;

import { createBrowserRouter, RouteObject } from "react-router";
import AppLayout from "../components/AppLayout";
import NotFound from "../pages/NotFound";
import Ai from "../pages/Ai";
import CyberSecurity from "../pages/CyberSecurity";
import CloudComputing from "../pages/CloudComputing";
import HomeLacturer from "../pages/HomeLacturer";
import SignIn from "../components/SignIn";

const routes: RouteObject[] = [
  {
    element: <AppLayout />, // AppLayout הוא המעטפת הכללית
    children: [
      { index: true, path: '/', element: <SignIn /> },  // נתיב ראשי שמפנה ל-SignIn
      {
        path: "HomeLacturer",
        children: [
          { index: true, element: <HomeLacturer /> },
          { path: "Ai", element: <Ai /> },
          { path: "CyberSecurity", element: <CyberSecurity /> },
          { path: "CloudComputing", element: <CloudComputing /> },
        ],
      },
      { path: "*", element: <NotFound /> },  // נתיב שיבצע הפניה לדף NotFound אם אין נתיב מתאים
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;


