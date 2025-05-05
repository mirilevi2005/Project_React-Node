
import HomePageStudent from '../components/student/HomePageStudent';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../redux/slice/authStateSlice';

const HomeStudent = () => {
  const user = useSelector(selectCurrentUser);
  return (
    <>
      <h1>student {user?.userName}</h1>
      <HomePageStudent />
    </>
  );
};

export default HomeStudent;