import { useContext } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const navStyle = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition ${
    isActive ? 'text-[#0066FF]' : 'text-[#0F172A] hover:text-[#0066FF]'
  }`;

export default function Header() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (authContext) {
      authContext.logout();
      alert('로그아웃 되었습니다.');
      navigate('/');
    }
  };

  return (
    <header className="w-full border-b border-[#E2E8F0] bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex h-[65px] max-w-[1280px] items-center justify-between px-[32px]">
        {/* 로고 영역 */}
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo-icon.svg" alt="TravelEase logo" className="h-8 w-8" />
          <span className="text-xl font-bold text-[#0066FF]">TravelEase</span>
        </Link>

        {/* 네비게이션 영역 (마이페이지 항상 노출) */}
        <nav className="flex items-center gap-10">
          <NavLink to="/" end className={navStyle}>
            홈
          </NavLink>
          <NavLink to="/products" className={navStyle}>
            여행지
          </NavLink>
          <NavLink to="/mypage" className={navStyle}>
            마이페이지
          </NavLink>
        </nav>

        {/* 사용자 액션 버튼 영역 (로그인 상태에 따라 분기) */}
        <div className="flex items-center gap-3">
          {authContext?.isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="cursor-pointer rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-[#0F172A] hover:bg-gray-200"
            >
              로그아웃
            </button>
          ) : (
            <>
              <Link
                to="/auth?tab=login"
                className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-[#0F172A] hover:bg-gray-200"
              >
                로그인
              </Link>
              <Link
                to="/auth?tab=signup"
                className="rounded-md bg-[#0066FF] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}