import { useMemo, useState, useContext } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  
  const authContext = useContext(AuthContext);

  const isDisabled = useMemo(() => {
    return !email.trim() || !password.trim();
  }, [email, password]);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('로그인 요청에 실패했습니다.');
      }

      const data = await response.json();
      
      if (authContext) {
        authContext.login(data.token);
      } else {
        localStorage.setItem('accessToken', data.token);
      }
      
      navigate('/');

    } catch (error) {
      console.error('로그인 에러:', error);
      alert('이메일 또는 비밀번호를 다시 확인해 주세요.');
    }
  };

  return (
    <form className="w-full flex flex-col gap-[20px]" onSubmit={handleSubmit}>
      <label className="text-textPrimary font-bold text-[14px]">
        이메일 주소
        <div className="w-full bg-[#F8FAFC] rounded-[8px] flex mt-2">
          <img src="/email-icon.svg" />
          <input
            className="flex-1 w-full bg-transparent text-[#6B7280] font-normal text-[14px] outline-none focus:outline-none ring-0 focus:ring-0"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoComplete="email"
          />
        </div>
      </label>

      <label className="text-textPrimary font-bold text-[14px]">
        비밀번호
        <div className="w-full bg-[#F8FAFC] rounded-[8px] flex mt-2">
          <img src="/password-icon.svg" />
          <input
            className="flex-1 w-full bg-transparent text-[#6B7280] font-normal text-[14px] outline-none focus:outline-none ring-0 focus:ring-0"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={passwordVisible ? 'text' : 'password'}
            autoComplete="current-password"
          />
          <button type="button" onClick={() => setPasswordVisible((v) => !v)}>
            {passwordVisible ? <img src="/eye-off-icon.svg" /> : <img src="/eye-on-icon.svg" />}
          </button>
        </div>
      </label>

      <button
        className="disabled:bg-gray-300 w-full text-center bg-primary text-white py-3 rounded-[8px] font-bold text-[16px] cursor-pointer"
        disabled={isDisabled}
        type="submit"
      >
        로그인
      </button>
    </form>
  );
}
