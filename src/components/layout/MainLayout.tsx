import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900">
      <Header />

      <main className="flex-1 mx-auto w-full max-w-[1280px] px-[32px]">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
