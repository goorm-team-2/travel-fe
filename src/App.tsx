import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import InquiryComplete from './pages/InquiryComplete';
import MyPage from './pages/MyPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inquiry/complete" element={<InquiryComplete />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}
