import { useMemo, useState } from 'react';

export default function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);

  const passwordsMatch = password === passwordConfirm;

  const isDisabled = useMemo(() => {
    return (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !passwordConfirm.trim() ||
      password !== passwordConfirm
    );
  }, [name, email, password, passwordConfirm]);

const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
  e.preventDefault();

  // 프론트엔드 단에서 비밀번호 확인 검증 (서버로 요청 보내기 전)
  if (password !== passwordConfirm) {
    alert('비밀번호가 일치하지 않습니다.');
    return; // 일치하지 않으면 통신을 시작하지 않고 함수 종료
  }

  try {
    // 백엔드 회원가입 API 호출
    const response = await fetch('http://localhost:8080/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // SignupRequest DTO 구조에 맞춰 전송
      body: JSON.stringify({ name, email, password }), 
    });

    if (!response.ok) {
      throw new Error('회원가입 요청에 실패했습니다.');
    }

    // 백엔드 응답 처리
    const message = await response.text(); 
    console.log('서버 응답:', message);
    
    alert('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
    
    // 회원가입 성공 후 로그인 페이지로 이동
    window.location.href = '/auth?tab=login'; 

  } catch (error) {
    console.error('회원가입 에러:', error);
    alert('회원가입 처리 중 문제가 발생했습니다. 다시 시도해 주세요.');
  }
};
  return (
    <form className="w-full flex flex-col gap-[20px]" onSubmit={handleSubmit}>
      <label className="text-textPrimary font-bold text-[14px]">
        이름
        <div className="w-full bg-[#F8FAFC] rounded-[8px] flex mt-2">
          <img src="/name-icon.svg" alt="" />
          <input
            className="flex-1 w-full bg-transparent text-[#6B7280] font-normal text-[14px] outline-none focus:outline-none ring-0 focus:ring-0"
            placeholder="이름을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            autoComplete="name"
          />
        </div>
      </label>

      <label className="text-textPrimary font-bold text-[14px]">
        이메일 주소
        <div className="w-full bg-[#F8FAFC] rounded-[8px] flex mt-2">
          <img src="/email-icon.svg" alt="" />
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
          <img src="/password-icon.svg" alt="" />
          <input
            className="flex-1 w-full bg-transparent text-[#6B7280] font-normal text-[14px] outline-none focus:outline-none ring-0 focus:ring-0"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={passwordVisible ? 'text' : 'password'}
            autoComplete="new-password"
          />
          <button type="button" onClick={() => setPasswordVisible((v) => !v)}>
            {passwordVisible ? (
              <img src="/eye-off-icon.svg" alt="" />
            ) : (
              <img src="/eye-on-icon.svg" alt="" />
            )}
          </button>
        </div>
      </label>

      <label className="text-textPrimary font-bold text-[14px]">
        비밀번호 확인
        <div className="w-full bg-[#F8FAFC] rounded-[8px] flex mt-2">
          <img src="/password-icon.svg" alt="" />
          <input
            className="flex-1 w-full bg-transparent text-[#6B7280] font-normal text-[14px] outline-none focus:outline-none ring-0 focus:ring-0"
            placeholder="비밀번호를 다시 입력하세요"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            type={passwordConfirmVisible ? 'text' : 'password'}
            autoComplete="new-password"
          />
          <button type="button" onClick={() => setPasswordConfirmVisible((v) => !v)}>
            {passwordConfirmVisible ? (
              <img src="/eye-off-icon.svg" alt="" />
            ) : (
              <img src="/eye-on-icon.svg" alt="" />
            )}
          </button>
        </div>
        {passwordConfirm.length > 0 && !passwordsMatch && (
          <p className="mt-2 text-[12px] font-normal text-red-500">비밀번호가 일치하지 않습니다.</p>
        )}
      </label>

      <button
        className="disabled:bg-gray-300 w-full text-center bg-primary text-white py-3 rounded-[8px] font-bold text-[16px] cursor-pointer"
        disabled={isDisabled}
        type="submit"
      >
        회원가입
      </button>
    </form>
  );
}
