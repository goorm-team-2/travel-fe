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

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('signup:', { name, email, password, passwordConfirm });
    // TODO: api 연결(회원가입 정보 전송)
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
