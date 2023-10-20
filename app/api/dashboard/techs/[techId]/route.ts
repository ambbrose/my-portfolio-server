import { auth, currentUser } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
    request: Request,
    { params }: { params: { techId: string } }
) {
    const { userId } = auth();

    const user = await currentUser();

    try {
        const body = await request.json();

        const {
            title, iconUrl, active
        } = body;

        if (!userId || user?.emailAddresses[0].emailAddress !== 'ambrosearuwa@gmail.com') {
            return new NextResponse("Unauthenticated", { status: 401 });
        };

        if (!title) {
            return new NextResponse("Title is required", { status: 400 });
        };

        const tech = await prismadb.technology.update({
            where: {
                id: params.techId
            },
            data: {
                title,
                iconUrl,
                active,
            }
        });

        return NextResponse.json(tech);

    } catch (error) {
        console.log('[TECH-PATCH-ERROR]:- ', error)
        return new NextResponse('Internal Server Error', { status: 500 });
    };
};

export async function DELETE(
    request: Request,
    { params }: { params: { techId: string } }
) {
    const { userId } = auth();

    const user = await currentUser();

    try {

        if (!userId || user?.emailAddresses[0].emailAddress !== 'ambrosearuwa@gmail.com') {
            return new NextResponse("Unauthenticated", { status: 401 });
        };

        const tech = await prismadb.technology.deleteMany({
            where: {
                id: params.techId
            }
        });

        return NextResponse.json(tech);
        
    } catch (error) {
        console.log('[TECH-DELETE-ERROR]:- ', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
};