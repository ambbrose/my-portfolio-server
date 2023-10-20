
import SidebarNav from "@/components/side-bar-nav";

const Sidebar = () => {

    return (
        <div className="bg-white shadow-2xl border border-slate-100 dark:border-none dark:bg-neutral-900 w-1/5 rounded-md p-2 sticky top-0 h-screen overflow-y-auto"
        >

            <SidebarNav />

           
        </div>
    );
};

export default Sidebar;
