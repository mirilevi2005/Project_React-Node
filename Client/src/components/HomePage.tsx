// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import { Typography } from '@mui/material';
// import { Link } from 'react-router';  // יבוא Link מ-react-router-dom
// import '../css/HomeLacturer.css';  // כולל את ה-CSS החיצוני
// import papersData from '../data/HomeLacturerData';  // ייבוא הנתונים
// const HomePage = () => {
//   return (
//     <div>
//       <label>"Advance the field of Computer Science"</label>
//       <Box className="container">
//         {/* שימוש ב-Map כדי ליצור Paper עבור כל פריט בנתונים */}
//         {papersData.map((item) => (
//           <Link to={`/HomeLacturer/${item.link}`}>
//             <Paper 
//               className="paper" 
//               elevation={3}
//               style={{
//                 backgroundImage: `url(${item.image})`  /* הוספת התמונה כרקע */
//               }}
//             >
//               <div className="paper-content">
//                 {/* הצגת כותרת */}
//                 <Typography variant="h6">{item.title}</Typography>
//               </div>
//             </Paper>
//           </Link>
//         ))}
//       </Box>
//     </div>
//   );
// }

// export default HomePage;


import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';  // תיקון היבוא
import '../css/HomeLacturer.css';  // כולל את ה-CSS החיצוני
import papersData from '../data/HomeLacturerData';  // ייבוא הנתונים

// הגדרת ממשק לסוג הנתונים
interface PaperItem {
  link: string;
  image: string;
  title: string;
}

const HomePage: React.FC = () => {
  return (
    <div>
      <label>"Advance the field of Computer Science"</label>
      <Box className="container">
        {/* שימוש ב-Map כדי ליצור Paper עבור כל פריט בנתונים */}
        {papersData.map((item: PaperItem, index: number) => (
          <Link key={index} to={`/HomeLacturer/${item.link}`}>
            <Paper 
              className="paper" 
              elevation={3}
              style={{
                backgroundImage: `url(${item.image})`  /* הוספת התמונה כרקע */
              }}
            >
              <div className="paper-content">
                {/* הצגת כותרת */}
                <Typography variant="h6">{item.title}</Typography>
              </div>
            </Paper>
          </Link>
        ))}
      </Box>
    </div>
  );
}

export default HomePage;
