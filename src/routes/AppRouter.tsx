import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Home from '../pages/Home';
import MyPage from '../pages/MyPage';
import InquiryComplete from '../pages/InquiryComplete';
import AuthPage from '../pages/Auth';
import ProductListPage from '../pages/ProductListPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import InquiryPage from '../pages/InquiryPage';

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/products', element: <ProductListPage /> },
      { path: '/products/:id', element: <ProductDetailPage /> },
      { path: '/inquiry/:id', element: <InquiryPage /> },
      { path: '/mypage', element: <MyPage /> },
      { path: '/inquiry/complete', element: <InquiryComplete /> },
      { path: '/auth', element: <AuthPage /> },
    ],
  },
]);
