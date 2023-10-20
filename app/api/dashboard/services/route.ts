import { auth, currentUser } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
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

        if (!iconUrl) {
            return new NextResponse("Icon is required", { status: 400 });
        };

        const service = await prismadb.service.create({
            data: {
                title,
                iconUrl,
                active,
            }
        });

        console.log('NEW-SERVICE:- ', service);
        return NextResponse.json(service);


    } catch (error) {
        console.log('[SERVICE-POST-ERROR]:- ', error);
        return new NextResponse('Internal Server Errorsss', { status: 500 });
    };
};


export async function GET(request: Request) {
    try {

        const { searchParams } = new URL(request.url);

        const active = searchParams.get('active');

        const services = await prismadb.service.findMany({
            where: {
                active: active ? true : undefined
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(services);

    } catch (error) {
        console.log('[SERVICES_GET_ALL]', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    };
};