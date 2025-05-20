//  import paperDemoImage from '../assets/paperDemo.png';
// const HomeLacturerData = [
//   { 
//     title: "AI", 
//     desc: "Artificial Intelligence", 
//     body: "AI is changing the world.", 
//     image: paperDemoImage,
//     link: "Ai",
//     courseName: "AI" // ✅ הוספה
//   },
//   { 
//     title: "Cyber Security", 
//     desc: "Protecting digital assets", 
//     body: "Cyber security is crucial in today's digital world.", 
//     image: paperDemoImage,
//     link: "CyberSecurity",
//     courseName: "CYBER" // ✅ הוספה
//   },
//   { 
//     title: "Cloud Computing", 
//     desc: "The future of cloud technology", 
//     body: "Cloud computing is transforming data storage.", 
//     image: paperDemoImage,
//     link: "CloudComputing",
//     courseName: "CLOUD" // ✅ הוספה
//   }
// ];

//   export default HomeLacturerData;
// HomeLacturerData.ts
// HomeLacturerData.ts
import paperDemoImage from '../assets/paperDemo.png';

// הגדרת הטיפוס לנתוני הקורס
interface CourseItem {
  title: string;
  desc: string;
  body: string;
  image: string;
  link: string;
  courseName: string;
}

const HomeLacturerData: CourseItem[] = [
  { 
    title: "AI", 
    desc: "Artificial Intelligence", 
    body: "AI is changing the world.", 
    image: paperDemoImage,
    link: "Ai",
    courseName: "AI"
  },
  { 
    title: "Cyber Security", 
    desc: "Protecting digital assets", 
    body: "Cyber security is crucial in today's digital world.", 
    image: paperDemoImage,
    link: "CyberSecurity",
    courseName: "CYBER"
  },
  { 
    title: "Cloud Computing", 
    desc: "The future of cloud technology", 
    body: "Cloud computing is transforming data storage.", 
    image: paperDemoImage,
    link: "CloudComputing",
    courseName: "CLOUD"
  }
];

export default HomeLacturerData;