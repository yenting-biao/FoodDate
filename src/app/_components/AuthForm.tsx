import { useState } from "react";
import { signIn } from "next-auth/react";
import AuthInput from "./AuthInput";

type AuthFormProps = {
  onCloseAuthModal: () => void;
};

function AuthForm({ onCloseAuthModal }: AuthFormProps) {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn("credentials", {
      email,
      username,
      password,
      callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    });
  };

  return (
    <div className="min-w-[300px] bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-end">
        <button
          onClick={onCloseAuthModal}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="mb-4 text-2xl font-semibold text-center text-black">
        {isSignUp ? "註冊" : "登入"}
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <AuthInput label="Email" type="email" value={email} setValue={setEmail} />
        {isSignUp && (
          <AuthInput label="使用者名稱" type="text" value={username} setValue={setUsername} />
        )}
        <AuthInput label="密碼" type="password" value={password} setValue={setPassword} />
        {isSignUp && (
          <AuthInput
            label="確認密碼"
            type="password"
            value={confirmPassword}
            setValue={setConfirmPassword}
          />
        )}
        <div className="text-sm text-gray-500">
          {isSignUp ? (
            <span>
              已經有帳號了？{" "}
              <button
                type="button"
                className="text-blue-500 hover:underline"
                onClick={() => setIsSignUp(false)}
              >
                登入
              </button>
            </span>
          ) : (
            <span>
              尚未註冊?{" "}
              <button
                type="button"
                className="text-blue-500 hover:underline"
                onClick={() => setIsSignUp(true)}
              >
                註冊
              </button>
            </span>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          {isSignUp ? "註冊" : "登入"}
        </button>
      </form>
      <div className="flex items-center justify-center mt-4">
        {/* Additional content */}
      </div>
    </div>
  );
}

export default AuthForm;
