
import './App.css'
import { Provider } from 'react-redux'
import router from './routes/appRouter'
import store from './redux/store'
import { RouterProvider } from 'react-router'

function App() {
  return (
    <>
      <Provider store={store}>
      <RouterProvider router={router}/>
      </Provider> 
    </>
  )
}

export default App
