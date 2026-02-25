import { NavLink, Link } from 'react-router-dom';

const navStyle = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition ${
    isActive ? 'text-[#0066FF]' : 'text-[#0F172A] hover:text-[#0066FF]'
  }`;

export default function Header() {
  return (
    <header className="w-full border-b border-[#E2E8F0] bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex h-[65px] max-w-[1280px] items-center justify-between px-[32px]">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo-icon.svg" alt="TravelEase logo" className="h-8 w-8" />
          <span className="text-xl font-bold text-[#0066FF]">TravelEase</span>
        </Link>

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

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-[#0F172A] hover:bg-gray-200"
          >
            로그인
          </Link>

          <Link
            to="/signup"
            className="rounded-md bg-[#0066FF] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            회원가입
          </Link>
        </div>
      </div>
    </header>
  );
}
