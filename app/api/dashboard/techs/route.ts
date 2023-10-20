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

        const tech = await prismadb.technology.create({
            data: {
                title,
                iconUrl,
                active,
            }
        });

        console.log('NEW-TECH:- ', tech);
        return NextResponse.json(tech);


    } catch (error) {
        console.log('[TECH-POST-ERROR]:- ', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    };
};

export async function GET(request: Request) {
    try {

        const { searchParams } = new URL(request.url);

        const active = searchParams.get('active');

        const techs = await prismadb.technology.findMany({
            where: {
                active: active ? true : undefined
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(techs);

    } catch (error) {
        console.log('[TECHS_GET_ALL]', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    };
};