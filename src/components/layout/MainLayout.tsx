import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900">
      <Header />

      <main className="mx-auto w-full max-w-[1280px] flex-1 px-[32px]">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
