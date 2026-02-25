import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Home from '../pages/Home';
import Products from '../pages/Products';
import MyPage from '../pages/MyPage';
import InquiryComplete from '../pages/InquiryComplete';
import AuthPage from '../pages/Auth';

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/products', element: <Products /> },
      { path: '/mypage', element: <MyPage /> },
      { path: '/inquiry/complete', element: <InquiryComplete /> },
      { path: '/auth', element: <AuthPage /> },
    ],
  },
]);
