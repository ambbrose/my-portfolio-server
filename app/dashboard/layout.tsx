import TopNavbar from "@/components/top-nav-bar";
import Sidebar from "@/components/side-bar";

import { auth } from '@clerk/nextjs';

import { redirect } from "next/navigation";

interface DashboardLayoutProps {
    children: React.ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {

    const { userId } = auth()

    if (!userId) {
        redirect('/sign-in');
    };

    return (
        <div
            className="bg-white dark:bg-black w-full gap-4 p-3 flex text text-neutral-700 dark:text-white"
        >

            <Sidebar />

            <div className="flex flex-col flex-1 text-white">
                <TopNavbar />
                <div
                    className="bg-neutral-100 dark:bg-neutral-900 shadow-sm flex-grow rounded-md px-4 mt-2
                    dark:text-white overflow-y-auto"
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;