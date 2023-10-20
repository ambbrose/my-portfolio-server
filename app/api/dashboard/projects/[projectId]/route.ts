import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { auth, currentUser } from "@clerk/nextjs";


export async function PATCH(
    request: Request,
    { params }: { params: { projectId: string } }
) {
    const { userId } = auth();

    const user = await currentUser();

    try {

        const body = await request.json();

        const {
            title, technologies, description, live_url,
            demo_url, active, live, images, source_code_link
        } = body;

        if (!userId || user?.emailAddresses[0].emailAddress !== 'ambrosearuwa@gmail.com') {
            return new NextResponse("Unauthenticated", { status: 401 });
        };

        if (!params.projectId) {
            return new NextResponse('Project ID is required', { status: 400 });
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

        await prismadb.project.update({
            where: {
                id: params.projectId,
            },
            data: {
                title,
                technologies,
                demo_url,
                description,
                live_url,
                source_code_link,
                live,
                active,
                images: {
                    deleteMany: {}
                },
            }
        });

        const project = await prismadb.project.update({
            where: {
                id: params.projectId,
            },
            data: {
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
        console.log('[PROJECT-UPDATE-ERROR]:- ', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    };
};

export async function DELETE(
    request: Request,
    { params }: { params: { projectId: string } }
) {
    const { userId } = auth();

    const user = await currentUser();

    try {

        if (!userId || user?.emailAddresses[0].emailAddress !== 'ambrosearuwa@gmail.com') {
            return new NextResponse("Unauthenticated", { status: 401 });
        };

        if (!params.projectId) {
            return new NextResponse('Project ID is required', { status: 400 });
        };

        const project = await prismadb.project.deleteMany({
            where: {
                id: params.projectId
            },
        });

        return NextResponse.json(project);

    } catch (error) {
        console.log('[PROJECT-DELETE-ERROR]:- ', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    };
};