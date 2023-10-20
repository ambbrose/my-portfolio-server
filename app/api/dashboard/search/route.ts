import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET(request: Request) {
    try {

        const { searchParams } = new URL(request.url);

        const active = searchParams.get('active');
        const searchParam = searchParams.get('searchParam');

        if (searchParam) {
            const project = await prismadb.project.findMany({
                where: {
                    active: active ? true : undefined,
                    title: {
                        contains: searchParam
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    images: true
                },
            });

            return NextResponse.json(project);
        }

    } catch (error) {
        console.log('[PROJECTS_GET_ERROR]', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    };
};