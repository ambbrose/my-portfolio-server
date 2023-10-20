"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { TechColumn, columns } from "./columns";

interface TechClientProps {
    data: TechColumn[];
};

const TechClient: React.FC<TechClientProps> = ({ data }) => {

    const router = useRouter();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title="Techs"
                    description="Manage all your tech balls for your portfolio."
                />

                <Button
                    onClick={() => router.push('/dashboard/techs/add')}
                >
                    <Plus className="h-4 w-4" />
                    Add New
                </Button>
            </div>

            <Separator />

            <DataTable columns={columns} data={data} searchKey="title" />
        </>
    );
};

export default TechClient;