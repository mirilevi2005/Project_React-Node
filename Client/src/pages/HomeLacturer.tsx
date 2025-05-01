
import HomePagelacturer from "../components/HomePagelacturer";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/slice/authStateSlice";
import { RootState } from "../redux/store";
const HomeLacturer = () => {
  const user=useSelector((state: RootState) => selectCurrentUser(state))
  return (
    <>
    <h1>Lacturer {user?.userName}</h1>
    <HomePagelacturer/>
    </>
  );
}

export default HomeLacturer;
