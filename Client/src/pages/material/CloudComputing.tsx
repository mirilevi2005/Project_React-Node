import { useSelector } from 'react-redux';
import VideoOfMaterial from '../../components/VideoOfMaterial';
import VideoOfMaterialStudent from '../../components/student/VideoOfMaterial';
import { selectCurrentUser } from '../../redux/slice/authStateSlice';

const CloudComputing = () => {
  const user = useSelector(selectCurrentUser);

  return (
    <div>
      <h1>Welcome to Ai course</h1>
      {user?.roles === 'lacturer' ? (
        <VideoOfMaterial />
      ) : (
        <VideoOfMaterialStudent />
      )}
    </div>
  );
};

export default CloudComputing
