"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { ServiceColumn, columns } from "./columns";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

interface ServiceClientProps {
    data: ServiceColumn[]
};

const ServiceClient: React.FC<ServiceClientProps> = ({ data }) => {

    const router = useRouter();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title="Services"
                    description="Manage all your services for your portfolio."
                />

                <Button
                    onClick={() => router.push('/dashboard/services/add')}
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

export default ServiceClient;