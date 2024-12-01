import { BrowserRouter, Route, Routes } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import NavigationRoutes from './NavigationRoutes';
import Login from '../pages/login/Login';

const RootRouter = () => {
  const accessToken = useAuthStore(state => state.auth?.token);

  return (
    <BrowserRouter>
      <Routes>
        {accessToken ? (
          <Route path='/*' element={<NavigationRoutes />} />
        ) : (
          <Route path='/*' element={<Login />} />
        )}
      </Routes>
    </BrowserRouter>
  )
}

export default RootRouter