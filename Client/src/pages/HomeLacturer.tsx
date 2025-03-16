import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { Link } from 'react-router';  // יבוא Link מ-react-router-dom
import '../css/HomeLacturer.css';  // כולל את ה-CSS החיצוני
import papersData from '../data/HomeLacturerData';  // ייבוא הנתונים

const HomeLacturer = () => {
  
  return (
    <div>
      <label>"Advance the field of Computer Science"</label>
      <Box className="container">
        {/* שימוש ב-Map כדי ליצור Paper עבור כל פריט בנתונים */}
        {papersData.map((item, index) => (
          <Link to={item.link} key={index}>
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

export default HomeLacturer;

