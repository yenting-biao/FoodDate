import AuthForm from "../_components/AuthForm";

type Props = {
    searchParams?: Record<"error", string>
}

export default function LoginPage(props: Props) {
    return (
        <div className="flex h-screen">
            <div className="w-1/2 flex justify-center items-center bg-gray-100">
                <img src="/map-and-location.png" alt="Food Image" className="max-w-xs" />
            </div>
            <div className="w-1/2 flex justify-center items-center">
                <div className="w-full max-w-xs">
                    <AuthForm error={props.searchParams?.error}/>
                </div>
            </div>
        </div>
    );
}