import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/server";

const LoginLinkPage = () => {
    return (
        <section className="bg-neutral-100 text-white rounded-xl p-10 w-4/5 flex flex-col justify-center items-center gap-10 mx-auto mt-10 grow drop-shadow-lg text-center font-bold border">
            <LoginLink className="bg-black text-white px-4 py-2 rounded">Login</LoginLink>
        </section>
    );
};

export default LoginLinkPage;