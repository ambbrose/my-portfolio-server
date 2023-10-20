import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

import { auth, currentUser } from "@clerk/nextjs";

export async function POST(request: Request) {
    const { userId } = auth();

    const user = await currentUser();

    try {

        const body = await request.json();

        const {
            title, technologies, description, live_url,
            demo_url, source_code_link, active, live, images
        } = body;

        if (!userId || user?.emailAddresses[0].emailAddress !== 'ambrosearuwa@gmail.com') {
            return new NextResponse("Unauthenticated", { status: 401 });
        };

        if (!title) {
            return new NextResponse("Title is required", { status: 400 });
        };

        if (!technologies) {
            return new NextResponse("Technologies is required", { status: 400 });
        };

        if (!images || !images.length) {
            return new NextResponse('Image URL is required', { status: 400 });
        };

        const project = await prismadb.project.create({
            data: {
                title,
                technologies,
                description,
                live_url,
                demo_url,
                source_code_link,
                active,
                live,
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: { url: string }) => image)
                        ]
                    }
                }
            }
        });

        return NextResponse.json(project);

    } catch (error) {

        console.log('[PROJECTS-POST-ERROR]:- ', error);
        return new NextResponse('Internal Server Error', { status: 500 });

    }
};

export async function GET(request: Request) {
    try {

        const { searchParams } = new URL(request.url);

        const active = searchParams.get('active');
        const take = searchParams.get('take') ? Number(searchParams.get('take')) : undefined;
        const skip = searchParams.get('skip') ? Number(searchParams.get('skip')) : 0;
        const searchParam = searchParams.get('searchParam') ?? undefined;

        if (!searchParam) {
            const project = await prismadb.project.findMany({
                where: {
                    active: active ? true : undefined,
                },
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    images: true
                },
                skip: skip,
                take: take
            });

            return NextResponse.json(project);
        }

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