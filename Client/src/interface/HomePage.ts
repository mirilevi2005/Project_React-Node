// הגדרת טיפוס לפריט קורס מתוך papersData
export interface CourseItem {
  title: string;
  desc: string;
  body: string;
  image: string;
  link: string;
  courseName: string;
  courseNameSee: string;
}

// מידע על וידאו עבור כל קורס
export interface VideoInfo {
  name: string;
  videos: number;
}

// הגדרות טיפוסים לסטטיסטיקות המתקבלות מה-API או ממצב הקומפוננטה
export interface CourseStatsData {
  totalStudents: number;
  totalCourses: number;
  totalVideos: number;
  viewPercentage: number;
  videos: VideoInfo[];
}


// עבור פריטי מערך ה-quickStats
export interface QuickStat {
 icon: React.ReactNode;
   title: string;
  value: string;
  bgColor: string;
}

// עבור אובייקט המשתמש מ-Redux state
export interface CurrentUser {
  id: string; // או number, בהתאם למודל המשתמש שלך
  userName: string;
  email: string;
  roles: string; // או string[] אם יש אפשרות למספר תפקידים
  // ניתן להוסיף כאן מאפייני משתמש רלוונטיים נוספים
}