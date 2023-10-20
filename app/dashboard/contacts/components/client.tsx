"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ContactColumn, columns } from "./columns";

interface ContactClientProps {
    data: ContactColumn[];
};

const ContactsClient: React.FC<ContactClientProps> = ({ data }) => {

    const router = useRouter();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title="Contacts"
                    description="Manage all your contacts for your portfolio."
                />

                <Button
                    onClick={() => router.push('/dashboard/contacts/add')}
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

export default ContactsClient;