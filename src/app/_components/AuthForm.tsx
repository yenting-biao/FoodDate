import { useState } from "react";
import { signIn } from "next-auth/react";
import AuthInput from "./AuthInput";
import 'react-toastify/dist/ReactToastify.css';

type AuthFormProps = {
    onCloseAuthModal: () => void;
};

function AuthForm({ onCloseAuthModal }: AuthFormProps) {
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const isEmailValid = email.endsWith("@ntu.edu.tw") && (email!=="@ntu.edu.tw");
    const isPasswordValid = password.length >= 8 && password.length <= 20 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password);
    const isPasswordConfirm = (password === confirmPassword);
    const isUsernameValid = username.length <= 20 && username.length > 0;
    const invalidSignUp = (!isEmailValid || !isPasswordValid || !isUsernameValid || !isPasswordConfirm);
    const invalidSignIn = (!isEmailValid || !isPasswordValid);
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
                {!isEmailValid &&
                    <p className="text-red-500 text-sm">
                        請輸入正確的ntu mail格式(@ntu.edu.tw)!
                    </p>}
                {isSignUp && (
                    <AuthInput label="使用者名稱" type="text" value={username} setValue={setUsername} />
                )}
                {!isUsernameValid && username.length > 0 &&
                    <p className="text-red-500 text-sm">
                        請輸入長度介於1-20的使用者名稱!
                    </p>}

                <AuthInput label="密碼" type="password" value={password} setValue={setPassword} />
                {isSignUp && (
                    <AuthInput
                        label="確認密碼"
                        type="password"
                        value={confirmPassword}
                        setValue={setConfirmPassword}
                    />
                )}
                {isSignUp && !isPasswordConfirm && confirmPassword.length > 0 &&
                    <p className="text-red-500 text-sm">
                        密碼不相符!
                    </p>}
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
                {isSignUp && (
                    <button
                        type="submit"
                        className={`w-full ${invalidSignUp ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600'} text-white py-2 rounded-md`}
                        disabled={invalidSignUp}
                    >
                        註冊
                    </button>
                )}
                {!isSignUp && (
                    <button
                        type="submit"
                        className={`w-full ${invalidSignIn ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600'} text-white py-2 rounded-md`}
                        disabled={invalidSignIn}
                    >
                        登入
                    </button>
                )}
            </form>
            <div className="flex items-center justify-center mt-4">
                {/* Additional content */}
            </div>
        </div>
    );
}

export default AuthForm;
