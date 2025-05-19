


import './App.css';
import { RouterProvider } from 'react-router';
import router from './routes/appRouter';
import { useEffect } from 'react';
import { useCookies, CookiesProvider } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { Provider } from 'react-redux';
import store from './redux/store';
import { setUser } from './redux/slice/authStateSlice';

function App() {
  const dispatch = useDispatch();
  const [cookies] = useCookies(['token', 'userName', 'email', 'roles','userId']);

  useEffect(() => {
    if (cookies?.token && cookies?.userName && cookies?.roles) {
      dispatch(setUser({
        token: cookies.token,
        userName: cookies.userName,
        email: cookies.email || '',
        roles: cookies.roles,
        _id:cookies.userId,
      }));
    }
  }, [cookies, dispatch]);

  return <RouterProvider router={router} />;
}

export default function AppWithProvider() {
  return (
    <Provider store={store}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </Provider>
  );
}
