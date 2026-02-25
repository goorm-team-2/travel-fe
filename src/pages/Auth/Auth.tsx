import { useSearchParams } from 'react-router-dom';
import LoginForm from './login';
import SignupForm from './signup';

type Tab = 'login' | 'signup';

export default function Auth() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get('tab') === 'signup' ? 'signup' : 'login';

  const messages: Record<Tab, string> = {
    login: '즐거운 여행의 시작, 로그인하고 더 많은 혜택을 누리세요.',
    signup: 'TravelEase에 오신 것을 환영합니다.',
  };

  return (
    <div className="w-[448px] bg-[#F8FAFC] border border-[#F1F5F9] rounded-[12px] shadow-[6px_6px_20px_rgba(0,0,0,0.08)]">
      <div className="w-full flex flex-col bg-white p-8 gap-8 rounded-t-[12px]">
        <p className="text-[#64748B] text-[14px] text-center">{messages[tab]}</p>

        {/* 탭 */}
        <div className="w-full flex font-bold text-[14px]">
          <button
            className={`text-center flex-1 pb-4 border-b ${
              tab === 'login' ? 'text-primary border-b-2 border-b-primary' : 'text-[#94A3B8]'
            }`}
            onClick={() => setSearchParams({ tab: 'login' })}
          >
            로그인
          </button>
          <button
            className={`text-center flex-1 pb-4 border-b ${
              tab === 'signup' ? 'text-primary border-b-2 border-b-primary' : 'text-[#94A3B8]'
            }`}
            onClick={() => setSearchParams({ tab: 'signup' })}
          >
            회원가입
          </button>
        </div>

        {tab === 'login' ? <LoginForm /> : <SignupForm />}
      </div>
      <div className="p-6 w-full text-center">
        {tab === 'login' ? (
          <p className="text-[14px] text-[#64748B]">
            아직 회원이 아니신가요?{' '}
            <span
              className="hover:underline hover:cursor-pointer text-primary font-bold"
              onClick={() => setSearchParams({ tab: 'signup' })}
            >
              회원가입하기
            </span>
          </p>
        ) : (
          <p className="text-[14px] text-[#64748B]">
            이미 계정이 있으신가요?{' '}
            <span
              className="hover:underline hover:cursor-pointer text-primary font-bold"
              onClick={() => setSearchParams({ tab: 'login' })}
            >
              로그인하기
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
