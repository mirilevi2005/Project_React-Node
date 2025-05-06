import { useSelector } from 'react-redux';
import VideoOfMaterial from '../../components/VideoOfMaterial';
import VideoOfMaterialStudent from '../../components/student/VideoOfMaterial';
import { selectCurrentUser } from '../../redux/slice/authStateSlice';

const CyberSecurity = () => {
  const user = useSelector(selectCurrentUser);

  return (
    <div>
      <h1>Welcome to CyberSecurity course</h1>
      {user?.roles === 'lacturer' ? (
        <VideoOfMaterial />
      ) : (
        <VideoOfMaterialStudent />
      )}
    </div>
  );
};
export default CyberSecurity