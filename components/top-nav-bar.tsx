import { Menu } from 'lucide-react';

import { UserButton } from "@clerk/nextjs";
import { ThemeToggle } from '@/components/theme-toggle';

const TopNavbar = () => {

    return (
        <div
            className="bg-neutral-100 dark:bg-neutral-900 shadow-md w-full rounded-md px-4 py-2 justify-between items-center flex flex-row"

        >
            <Menu className='text-black dark:text-white bg-cover bg-center' />

            <div className='flex flex-row items-center gap-4'>

                <ThemeToggle />

                <div className='font-serif flex flex-row items-center justify-center gap-2.5'>
                    <p className='font-semibold text-blue-500'>Welcome</p>
                    <p className='text-black dark:text-white'>Ambrose</p>
                </div>

                <UserButton afterSignOutUrl="/" />
            </div>
        </div>
    );
};

export default TopNavbar;