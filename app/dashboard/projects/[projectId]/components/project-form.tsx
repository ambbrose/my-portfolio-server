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

import { Project, ProductImage } from "@prisma/client";
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
    title: z.string().min(1),
    technologies: z.string().min(1),
    description: z.string(),
    live_url: z.string().optional(),
    demo_url: z.string().optional(),
    source_code_link: z.string().optional(),
    live: z.boolean().default(false).optional(),
    active: z.boolean().default(false).optional(),
    images: z.array(
        z.object({
            url: z.string(),
        })
    )
});

type ProjectFormValues = z.infer<typeof formSchema>;

interface ProjectFormProps {
    initialData: Project & {
        images: ProductImage[];
    } | null;
};

const ProjectForm: React.FC<ProjectFormProps> = ({ initialData }) => {

    const router = useRouter();
    const params = useParams();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit Project" : "Create Project";
    const description = initialData ? "Edit the current project" : "Add a new project";
    const toastDescriptionMessage = initialData ? "Project updated successfully." : "Project created successfully.";

    const form = useForm<ProjectFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? {
            ...initialData,
        } : {
            title: '',
            technologies: '',
            description: '',
            live_url: '',
            demo_url: '',
            source_code_link: '',
            live: false,
            active: false,
            images: []
        }
    });

    const onSubmit = async (data: ProjectFormValues) => {
        try {
            setLoading(true);

            if (initialData) {
                await axios.patch(`/api/dashboard/projects/${params.projectId}`, data);
            } else {
                await axios.post(`/api/dashboard/projects`, data);
            };

            router.refresh();
            router.push(`/dashboard/projects`);

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

            await axios.delete(`/api/dashboard/projects/${params.projectId}`);

            router.refresh();
            router.push(`/dashboard/projects`);

            toast({
                variant: 'default',
                description: 'Project deleted successfully.',
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
                        name="images"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Images</FormLabel>

                                <FormControl>
                                    <ImageUpload
                                        disabled={loading}
                                        value={field.value.map((image) => image.url)}
                                        onChange={(url) => field.onChange([...field.value, { url }])}
                                        onRemove={(url) => field.onChange([...field.value.filter((current) => current.url !== url)])}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name='title'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>

                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Project Title"
                                            className="bg-neutral-400 dark:bg-neutral-800 text-white border-none shadow-md focus:outline-none"
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='live_url'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Live URL</FormLabel>

                                    <FormControl>
                                        <Input
                                            {...field}
                                            type='url'
                                            placeholder="Project Live URL"
                                            className="bg-neutral-400 dark:bg-neutral-800 text-white border-none shadow-md focus:outline-none"
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='demo_url'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Demo URL</FormLabel>

                                    <FormControl>
                                        <Input
                                            {...field}
                                            type='url'
                                            placeholder="Project Demo URL"
                                            className="bg-neutral-400 dark:bg-neutral-800 text-white shadow-md focus:outline-none border-none"
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="live"
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
                                            Live
                                        </FormLabel>

                                        <FormDescription>
                                            This project is done and in use by the client.
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
                                            This project will appear on the home page.
                                        </FormDescription>
                                    </div>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='source_code_link'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Source Code</FormLabel>

                                    <FormControl>
                                        <Input
                                            {...field}
                                            type='url'
                                            placeholder="Project Live URL"
                                            className="bg-neutral-400 dark:bg-neutral-800 text-white border-none shadow-md focus:outline-none"
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <FormField
                            control={form.control}
                            name='technologies'
                            render={({ field }) => (
                                <FormItem className='flex flex-col'>
                                    <FormLabel>Technolgies</FormLabel>

                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            rows={5}
                                            placeholder="Project Excerpt"
                                            className="bg-neutral-400 dark:bg-neutral-800 text-white
                                            border-none rounded-md p-2"
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='description'
                            render={({ field }) => (
                                <FormItem className='flex flex-col'>
                                    <FormLabel>Description</FormLabel>

                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            rows={5}
                                            placeholder="Project Excerpt"
                                            className="bg-neutral-400 dark:bg-neutral-800 text-white
                                            border-none rounded-md p-2"
                                        />
                                    </FormControl>

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

export default ProjectForm;