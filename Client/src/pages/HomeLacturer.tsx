import { useSelector } from 'react-redux';
import HomePagelacturer from '../components/HomePagelacturer';
import { selectCurrentUser } from '../redux/slice/authStateSlice';

const HomeLacturer = () => {
  const user = useSelector(selectCurrentUser);

  return (
    <>
      <h1>Lacturer {user?.userName}</h1>
      <HomePagelacturer />
    </>
  );
};

export default HomeLacturer;
