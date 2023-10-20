
import { currentUser } from "@clerk/nextjs";

const DashboardPage = async () => {

    const user = await currentUser()

    return (
        <div className="h-full w-full flex items-center justify-center p-4">
            <div className="bg-neutral-800 flex flex-col items-center justify-center p-12 rounded-md ">
                <p className="text-blue-300 text-2xl font-serif">
                    Hi, {user?.firstName}
                </p>
                Welcome to your Dashboard
            </div>
        </div>
    );
};

export default DashboardPage;