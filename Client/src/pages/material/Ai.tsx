import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/slice/authStateSlice';
import LecturerCourseMaterialsManager from '../../components/LecturerCourseMaterialsManager';
import StudentCourseMaterialsManager from '../../components/student/StudentCourseMaterialsManager';

const Ai = () => {
  const user = useSelector(selectCurrentUser);

  return (
    <div>
      <h1>Welcome to Ai course</h1>
      {user?.roles === 'lecturer' ? (
        <LecturerCourseMaterialsManager/>
      ) : (
        <StudentCourseMaterialsManager />

      )}
    </div>
  );
};

export default Ai;
