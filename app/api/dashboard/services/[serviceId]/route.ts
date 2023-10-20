import { auth, currentUser } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
    request: Request,
    { params }: { params: { serviceId: string } }
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

        const service = await prismadb.service.update({
            where: {
                id: params.serviceId
            },
            data: {
                title,
                iconUrl,
                active,
            }
        });

        return NextResponse.json(service);

    } catch (error) {
        console.log('[SERVICE-PATCH-ERROR]:- ', error)
        return new NextResponse('Internal Server Error', { status: 500 });
    };
};

export async function DELETE(
    request: Request,
    { params }: { params: { serviceId: string } }
) {
    const { userId } = auth();

    const user = await currentUser();

    try {

        if (!userId || user?.emailAddresses[0].emailAddress !== 'ambrosearuwa@gmail.com') {
            return new NextResponse("Unauthenticated", { status: 401 });
        };

        const service = await prismadb.service.deleteMany({
            where: {
                id: params.serviceId
            }
        });

        return NextResponse.json(service);
        
    } catch (error) {
        console.log('[SERVICE-DELETE-ERROR]:- ', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
};