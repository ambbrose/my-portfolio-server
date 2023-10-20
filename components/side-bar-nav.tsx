"use client";

import { useState } from "react";
import { LayoutGrid } from "lucide-react";

import { usePathname, useRouter } from "next/navigation";

import SidebarNavItem from "@/components/side-bar-nav-item";

const SidebarNav = () => {

    const pathname = usePathname();
    const router = useRouter();

    const [navigationOptions, setNavigationOptions] = useState([
        {
            label: 'Projects',
            active: pathname.includes('/dashboard/projects'),
            subOptions: [
                { label: 'View Products', href: '/dashboard/projects' },
                { label: 'Add Products', href: '/dashboard/projects/add' }
            ],
            open: false
        },
        {
            label: 'Services',
            active: pathname.includes('/dashboard/services'),
            subOptions: [
                { label: 'View Services', href: '/dashboard/services' },
                { label: 'Add Services', href: '/dashboard/services/add' }
            ],
            open: false
        },
        {
            label: 'Techs',
            active: pathname.includes('/dashboard/techs'),
            subOptions: [
                { label: 'View Techs', href: '/dashboard/techs' },
                { label: 'Add Techs', href: '/dashboard/techs/add' }
            ],
            open: false
        },
        {
            label: 'Contacts',
            active: pathname.includes('/dashboard/contacts'),
            subOptions: [
                { label: 'View Contacts', href: '/dashboard/contacts' },
                { label: 'Add Contacts', href: '/dashboard/contacts/add' }
            ],
            open: false
        }
    ]);

    const handleOptionClick = (label: string) => {
        setNavigationOptions((prevOptions) =>
            prevOptions.map((option, i) => {
                if (option.label === label) {
                    return { ...option, open: !option.open };
                }
                return option;
            })
        );
    };

    return (
        <>
            <div
                className="bg-neutral-100 dark:bg-neutral-800 shadow-lg flex items-center justify-center py-2 rounded-md font-bold text-xl"
            >
                codeVeegan Admin
            </div>

            <div
                onClick={() => router.push('/dashboard')}
                className="bg-neutral-100 dark:bg-neutral-800 shadow-lg flex items-center justify-center py-2 mt-6 rounded-md gap-x-2 text-xl cursor-pointer font-semibold"
            >
                <LayoutGrid size={20} />
                Dashboard
            </div>

            <p className="items-center justify-center flex pt-4 pb-0 font-semibold">
                All Sections
            </p>

            <div className="space-y-2">
                {navigationOptions.map((option) => (
                    <SidebarNavItem
                        key={option.label}
                        option={option}
                        onClick={() => handleOptionClick(option.label)}
                    />
                ))}
            </div>
        </>
    );
};

export default SidebarNav;