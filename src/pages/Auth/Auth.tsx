import LoginForm from './login';
import SignupForm from './signup';

export default function Auth() {
  return (
    <div className="w-[448px] bg-white border border-[#F1F5F9] rounded-[12px]">
      <LoginForm />
      <SignupForm />
    </div>
  );
}
