import VideoOfMaterial from "../../components/VideoOfMaterial"
import { selectCurrentUser } from '../../redux/slice/authStateSlice';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import VideoOfMaterialStudent from '../../components/student/VideoOfMaterial'
const CyberSecurity = () => {
    const user = useSelector((state: RootState) => selectCurrentUser(state))!;
  
  return (
    <div>
      <h1>welcome to CyberSecurity course</h1>
      {user.roles==='lacturer'?
      (<VideoOfMaterial/>)
      : <VideoOfMaterialStudent/>
      }
    </div>
  )
}

export default CyberSecurity
