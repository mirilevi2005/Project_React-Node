import { useSelector } from 'react-redux';
import VideoOfMaterialLacturer from '../../components/video/VideoOfMaterialLacturer';
import VideoOfMaterialStudent from '../../components/student/VideoOfMaterialStudent';
import { selectCurrentUser } from '../../redux/slice/authStateSlice';
import LecturerCourseMaterialsManager from '../../components/LecturerCourseMaterialsManager';
import StudentCourseMaterialsManager from '../../components/student/StudentCourseMaterialsManager';

const CloudComputing = () => {
  const user = useSelector(selectCurrentUser);

  return (
    <div>
      <h1>Welcome to CloudComputing course</h1>
      {user?.roles === 'lacturer' ? (
        // <VideoOfMaterialLacturer />
        <LecturerCourseMaterialsManager/>
      ) : (
        // <VideoOfMaterialStudent />
        <StudentCourseMaterialsManager/>
      )}
    </div>
  );
};

export default CloudComputing
