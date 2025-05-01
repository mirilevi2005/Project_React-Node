import { useSelector } from 'react-redux';
import VideoOfMaterial from '../../components/VideoOfMaterial'
import VideoOfMaterialStudent from '../../components/student/VideoOfMaterial'
// import '../../css/DesignMaterial.css'
import { selectCurrentUser } from '../../redux/slice/authStateSlice';
import { RootState } from '../../redux/store';
const Ai = () => {
  const user = useSelector((state: RootState) => selectCurrentUser(state))!;
  {console.log(user)}

  return (
    <div>
      <h1>welcome to Ai course</h1>
      
      {user.roles==='lacturer'?
      (<VideoOfMaterial/>)
      : <VideoOfMaterialStudent/>
      }

    
    </div>
  )
}

export default Ai


