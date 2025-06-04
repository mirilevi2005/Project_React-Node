
import paperDemoImage from '../assets/paperDemo.png';

interface CourseItem {
  title: string;
  desc: string;
  body: string;
  image: string;
  link: string;
  courseName: string;
  courseNameSee:string
}

const HomeLecturerData: CourseItem[] = [
  { 
    title: "AI", 
    desc: "Artificial Intelligence", 
    body: "AI is changing the world.", 
    image: paperDemoImage,
    link: "Ai",
    courseName: "Ai",
    courseNameSee:'Ai'
  },
  { 
    title: "Cyber Security", 
    desc: "Protecting digital assets", 
    body: "Cyber security is crucial in today's digital world.", 
    image: paperDemoImage,
    link: "CyberSecurity",
    courseName: "CyberSecurity",
     courseNameSee:'Cyber'
  },
  { 
    title: "Cloud Computing", 
    desc: "The future of cloud technology", 
    body: "Cloud computing is transforming data storage.", 
    image: paperDemoImage,
    link: "CloudComputing",
    courseName: "CloudComputing",
     courseNameSee:'Cloud'
  }
];

export default HomeLecturerData;