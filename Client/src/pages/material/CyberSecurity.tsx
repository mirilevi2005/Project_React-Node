import { useSelector } from 'react-redux';

import VideoOfMaterialStudent from '../../components/student/VideoOfMaterialStudent';
import { selectCurrentUser } from '../../redux/slice/authStateSlice';
import VideoOfMaterialLacturer from '../../components/video/VideoOfMaterialLacturer';
import LecturerCourseMaterialsManager from '../../components/LecturerCourseMaterialsManager';
import StudentCourseMaterialsManager from '../../components/student/StudentCourseMaterialsManager';

const CyberSecurity = () => {
  const user = useSelector(selectCurrentUser);

  return (
    <div>
      <h1>Welcome to CyberSecurity course</h1>
      {user?.roles === 'lacturer' ? (
        <LecturerCourseMaterialsManager/>
      ) : (
        // <VideoOfMaterialStudent />
        <StudentCourseMaterialsManager/>
      )}
    </div>
  );
};
export default CyberSecurity