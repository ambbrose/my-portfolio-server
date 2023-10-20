"use client";

import * as z from 'zod';

import axios from 'axios';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Trash, Loader } from "lucide-react";
import { useParams, useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button";
import { Checkbox } from '@/components/ui/checkbox';
import Heading from "@/components/ui/heading";
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import {
    Form, FormControl, FormField, FormItem,
    FormLabel, FormMessage, FormDescription
} from "@/components/ui/form";
import ImageUpload from '@/components/ui/image-upload';
import { AlertModal } from '@/components/modals/alert-modal';

import { Contact } from "@prisma/client";
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
    title: z.string().min(1),
    contact: z.string().min(1),
    iconUrl: z.string().min(1),
    active: z.boolean().default(false).optional(),
    urlType: z.boolean().default(false).optional(),
});

type ContactFormValues = z.infer<typeof formSchema>;

interface ContactFormProps {
    initialData: Contact | null;
};

const ContactForm: React.FC<ContactFormProps> = ({ initialData }) => {

    const router = useRouter();
    const params = useParams();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit Contact" : "Create Contact";
    const description = initialData ? "Edit the current contact" : "Add a new contact";
    const toastDescriptionMessage = initialData ? "Service updated successfully." : "Service created successfully.";

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? {
            ...initialData,
        } : {
            title: '',
            contact: '',
            iconUrl: '',
            active: false,
            urlType: false
        }
    });

    const onSubmit = async (data: ContactFormValues) => {
        try {
            setLoading(true);

            if (initialData) {
                await axios.patch(`/api/dashboard/contacts/${params.contactId}`, data);
            } else {
                await axios.post(`/api/dashboard/contacts`, data);
            };

            router.refresh();
            router.push(`/dashboard/contacts`);

            toast({
                variant: 'default',
                description: toastDescriptionMessage,
                className: 'bg-green-700 text-white'
            });

        } catch (error) {

            toast({
                variant: 'destructive',
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with the process."
            });

        } finally {
            setLoading(false);
        };
    };

    const onDelete = async () => {
        try {
            setLoading(true);

            await axios.delete(`/api/dashboard/contacts/${params.contactId}`);

            router.refresh();
            router.push(`/dashboard/contacts`);

            toast({
                variant: 'default',
                description: 'Tech deleted successfully.',
                className: 'bg-green-600 text-white'
            });

        } catch (error) {

            toast({
                variant: 'destructive',
                title: "Uh oh! Something went wrong.",
                description: 'Check network connection and try again.'
            });

        } finally {
            setLoading(false);
            setOpen(false);
        };
    };

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onconfirm={onDelete}
                loading={loading}
            />

            <div className="flex items-center justify-between">
                <Heading
                    title={title}
                    description={description}
                />

                {initialData &&
                    <Button
                        variant={'destructive'}
                        size={'icon'}
                        onClick={() => { setOpen(true) }}
                    >
                        <Trash className="w-4 h-4" />
                    </Button>}
            </div>

            <Separator />

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-full"
                >
                    <FormField
                        control={form.control}
                        name="iconUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Icon</FormLabel>

                                <FormControl>
                                    <ImageUpload
                                        value={field.value ? [field.value] : []}
                                        disabled={loading}
                                        onChange={(url) => field.onChange(url)}
                                        onRemove={() => field.onChange("")}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className='grid grid-cols-2 gap-8'>
                        <FormField
                            control={form.control}
                            name='title'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>

                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="contact Title"
                                            className="bg-neutral-400 dark:bg-neutral-800 text-white border-none shadow-md focus:outline-none"
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='contact'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contact</FormLabel>

                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Contact URL or Number"
                                            className="bg-neutral-400 dark:bg-neutral-800 text-white border-none shadow-md focus:outline-none"
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className='grid grid-cols-2 gap-8'>
                        <FormField
                            control={form.control}
                            name="urlType"
                            render={({ field }) => (
                                <FormItem className='flex flex-row items-start border space-x-3 space-y-0 rounded-md p-4'>
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>

                                    <div className='space-y-1 leading-none'>
                                        <FormLabel>
                                            URL Type?
                                        </FormLabel>

                                        <FormDescription>
                                            This will determine if the contact is by url or otherwise
                                        </FormDescription>
                                    </div>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="active"
                            render={({ field }) => (
                                <FormItem className='flex flex-row items-start border space-x-3 space-y-0 rounded-md p-4'>
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>

                                    <div className='space-y-1 leading-none'>
                                        <FormLabel>
                                            Active
                                        </FormLabel>

                                        <FormDescription>
                                            This service will appear on the home page.
                                        </FormDescription>
                                    </div>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button
                        disabled={loading}
                        className="ml-auto"
                        type='submit'
                    >
                        {loading && <Loader className='mr-2 h-4 w-4 animate-spin' />}
                        {loading && initialData ?
                            'Updating...' : loading && !initialData ?
                                'Creating...' : initialData ?
                                    'Save changes' : 'Create'
                        }
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default ContactForm;