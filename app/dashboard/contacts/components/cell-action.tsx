"use client";

import axios from "axios";

import { useState } from "react";

import { Copy, CopyCheck, Edit, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { AlertModal } from "@/components/modals/alert-modal";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ContactColumn } from "./columns";
import { useRouter } from "next/navigation";


interface CellActionProps {
    data: ContactColumn;
};

export const CellAction: React.FC<CellActionProps> = ({ data }) => {

    const router = useRouter();

    const [copied, setCopied] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);

        setCopied(true);

        toast({
            variant: 'default',
            description: 'Product ID copied to the clipboard',
            className: 'bg-green-600 text-white'
        });

        setTimeout(() => {
            setCopied(false);
        }, 5000);

    };

    const onUpdate = (id: string) => {
        router.push(`/dashboard/contacts/${id}`);
    };

    const onDelete = async () => {
        try {
            setLoading(true);

            await axios.delete(`/api/dashboard/contacts/${data.id}`);

            router.refresh();

            toast({
                variant: 'default',
                description: 'Your product has been deleted successfully.',
                className: 'bg-green-600 text-white '
            });

        } catch (error) {

            toast({
                variant: 'destructive',
                title: "Uh oh! Something went wrong.",
                description: 'Make sure you remove all categories using this product.'
            });

        } finally {
            setLoading(false);
            setOpen(false);
        };
    };


    return (
        <>
            <AlertModal
                loading={loading}
                isOpen={open}
                onClose={() => setOpen(false)}
                onconfirm={onDelete}
            />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="bg-neutral-800">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={() => onCopy(data.id)}
                    >
                        {copied ? <CopyCheck className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                        Copy ID
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={() => onUpdate(data.id)}
                    >
                        <Edit className="mr-2 h-4 w-4" />
                        Update
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};