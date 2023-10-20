import { redirect } from "next/navigation";

import { Power } from "lucide-react"

const Logout = () => {
    return (
        <div
            className="dark:bg-transparent w-full items-center justify-center flex py-2 px-0 rounded gap-2 dark:border dark:border-red-700 dark:text-red-700 text-white bg-slate-950"
            onClick={() => redirect('/sign')}
        >
            <Power />
            Logout
        </div>
    );
};

export default Logout;