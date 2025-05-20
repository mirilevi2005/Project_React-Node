


import { createBrowserRouter, RouteObject } from "react-router";
import AppLayout from "../components/AppLayout";
import NotFound from "../pages/NotFound";
import Ai from "../pages/material/Ai";
import CyberSecurity from "../pages/material/CyberSecurity";
import CloudComputing from "../pages/material/CloudComputing";
import HomeLacturer from "../pages/HomeLacturer";
import HomeStudent from "../pages/HomeStudent"; // נוספנו את דף ה-HomeStudent
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp"; // ✅ ייבוא קומפוננטת SignUp

const routes: RouteObject[] = [
  {
    element: <AppLayout />,
    children: [
      { index: true, path: '/', element: <SignIn /> },
      { path: "SignUp", element: <SignUp /> },
      {
        path: "HomeLacturer",
        children: [
          { index: true, element: <HomeLacturer /> },
          { path: "Ai", element: <Ai /> },
          { path: "CyberSecurity", element: <CyberSecurity /> },
          { path: "CloudComputing", element: <CloudComputing /> },
        ],
      },
      { path: "HomeStudent",
        children:
        [
          { index: true, element: <HomeStudent /> },
          { path: "Ai", element: <Ai /> },
          { path: "CyberSecurity", element: <CyberSecurity /> },
          { path: "CloudComputing", element: <CloudComputing /> },
        ]
       }, // הוספנו את הנתיב ל-HomeStudent
      { path: "*", element: <NotFound /> },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;




// // src/router/index.tsx
// import { createBrowserRouter } from "react-router-dom";
// import AppLayout from "../components/AppLayout";
// import NotFound from "../pages/NotFound";
// import Ai from "../pages/material/Ai";
// import CyberSecurity from "../pages/material/CyberSecurity";
// import CloudComputing from "../pages/material/CloudComputing";
// import HomeLecturer from "../pages/HomeLacturer";
// import HomeStudent from "../pages/HomeStudent";
// import SignIn from "../components/SignIn";
// import SignUp from "../components/SignUp";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <AppLayout />,
//     children: [
//       { index: true, element: <SignIn /> },
//       { path: "signup", element: <SignUp /> },

//       {
//         path: "HomeLacturer",
//         element: <HomeLecturer />,
//         children: [
//           { path: "ai", element: <Ai /> },
//           { path: "cyber-security", element: <CyberSecurity /> },
//           { path: "cloud-computing", element: <CloudComputing /> },
//         ],
//       },

//       {
//         path: "HomeStudent",
//         element: <HomeStudent />,
//         children: [
//           { path: "ai", element: <Ai /> },
//           { path: "cyber-security", element: <CyberSecurity /> },
//           { path: "cloud-computing", element: <CloudComputing /> },
//         ],
//       },

//       { path: "*", element: <NotFound /> },
//     ],
//   },
// ]);
// export default router;

