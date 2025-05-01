import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../redux/slice/authStateSlice';
import { RootState } from '../redux/store';
import HomePageStudent from '../components/student/HomePageStudent';

const HomeStudent = () => {
  const user = useSelector((state: RootState) => selectCurrentUser(state));
console.log(user?.userName);

  return (
    <div>
      <h1>Student {user?.userName}</h1>
      <HomePageStudent/>
    </div>
  );
};

export default HomeStudent;

