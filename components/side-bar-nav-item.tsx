"use client";

import { ChevronDown, ChevronUp, MoveRight } from "lucide-react"

import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useRouter } from "next/navigation";

interface SidebarNavItemProps {
    option: {
        label: string;
        subOptions: {
            label: string;
            href: string
        }[];
        active: boolean;
        open: boolean;
    };
    onClick: () => void;
};

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ option, onClick }) => {

    const router = useRouter();

    const onRoute = (subOption: { label: string, href: string }) => {
        router.push(subOption.href);     
    };

    return (
        <Collapsible
            open={option.open}
            className={cn(
                "bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-300 shadow-lg flex flex-col items-center justify-center py-0.5 mt-6 rounded-md gap-x-2 text-xl",
                option.active && 'bg-neutral-300'
            )}
        >
            <div className="flex items-center justify-between space-x-4 px-4 w-full">
                <h4 className="text-lg font-semibold items-start">
                    {option.label}
                </h4>

                <CollapsibleTrigger
                    asChild
                    className="dark:bg-transparent hover:bg-neutral-600"
                    onClick={onClick}
                >
                    <Button variant={'default'} size="sm" className="w-9 p-0">
                        {option.open ?
                            <ChevronUp className="h-4 w-4 dark:text-white" /> :
                            <ChevronDown className="h-4 w-4 dark:text-white" />}

                        <span className="sr-only">Toggle</span>
                    </Button>
                </CollapsibleTrigger>
            </div>

            <CollapsibleContent className="space-y-0.5 w-full">
                {option.subOptions.map((subOption) => (
                    <div
                        key={subOption.label}
                        className="px-6 flex font-mono text-sm items-center gap-2 hover:bg-neutral-800 cursor-pointer"
                        onClick={() => onRoute(subOption)}
                    >
                        <MoveRight />
                        {subOption.label}
                    </div>
                ))}
            </CollapsibleContent>
        </Collapsible>
    );
};

export default SidebarNavItem;