import { useSelector } from 'react-redux';

import { selectCurrentUser } from '../../redux/slice/authStateSlice';
import LecturerCourseMaterialsManager from '../../components/LecturerCourseMaterialsManager';
import StudentCourseMaterialsManager from '../../components/student/StudentCourseMaterialsManager';

const CyberSecurity = () => {
  const user = useSelector(selectCurrentUser);

  return (
    <div>
      <h1>Welcome to CyberSecurity course</h1>
      {user?.roles === 'lecturer' ? (
        <LecturerCourseMaterialsManager/>
      ) : (
        <StudentCourseMaterialsManager/>
      )}
    </div>
  );
};
export default CyberSecurity