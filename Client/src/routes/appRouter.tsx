
// import { createBrowserRouter, RouteObject } from "react-router";
// import AppLayout from "../components/AppLayout";
// import NotFound from "../pages/NotFound";
// import Ai from "../pages/Ai";
// import CyberSecurity from "../pages/CyberSecurity";
// import CloudComputing from "../pages/CloudComputing";
// import HomeLacturer from "../pages/HomeLacturer";
// import SignIn from "../components/SignIn";
// import SignUp from "../components/SignUp"; // ✅ ייבוא קומפוננטת SignUp


// const routes: RouteObject[] = [
//   {
//     element: <AppLayout />, // AppLayout הוא המעטפת הכללית
//     children: [
//       { index: true, path: '/', element: <SignIn /> }, 
//       { path: "SignUp", element: <SignUp /> },  // נתיב ראשי שמפנה ל-SignIn
//       {
//         path: "HomeLacturer",
//         children: [
//           { index: true, element: <HomeLacturer /> },
//           { path: "Ai", element: <Ai /> },
//           { path: "CyberSecurity", element: <CyberSecurity /> },
//           { path: "CloudComputing", element: <CloudComputing /> },
//         ],
//       },
//        // נתיב ל-FinishSignIn
//        { path: "*", element: <NotFound /> },
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
      { path: "HomeStudent", element: <HomeStudent />,
        children:[
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
