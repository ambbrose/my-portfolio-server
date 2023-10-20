import { auth, currentUser } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

import { NextResponse } from "next/server";

export async function POST(request: Request) {

    const { userId } = auth();

    const user = await currentUser();

    try {
        const body = await request.json();

        const {
            title, contact, iconUrl, active, urlType
        } = body;

        if (!userId || user?.emailAddresses[0].emailAddress !== 'ambrosearuwa@gmail.com') {
            return new NextResponse("Unauthenticated", { status: 401 });
        };

        if (!title) {
            return new NextResponse("Title is required", { status: 400 });
        };

        if (!contact) {
            return new NextResponse("Contact is required", { status: 400 });
        };

        if (!iconUrl) {
            return new NextResponse("Icon is required", { status: 400 });
        };

        const contac = await prismadb.contact.create({
            data: {
                title,
                contact,
                iconUrl,
                active,
                urlType
            }
        });

        console.log('NEW-CONTACT:- ', contac);
        return NextResponse.json(contac);

    } catch (error) {
        console.log('[CONTACT-POST-ERROR]:- ', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    };
};

export async function GET(request: Request) {
    try {

        const { searchParams } = new URL(request.url);

        const active = searchParams.get('active');
        const urlType = searchParams.get('urlType');

        if (urlType === 'false') {
            const contacts = await prismadb.contact.findMany({
                where: {
                    active: active ? true : undefined,
                    urlType: false
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });

            return NextResponse.json(contacts);

        } else if (urlType === 'true') {
            const contacts = await prismadb.contact.findMany({
                where: {
                    active: active ? true : undefined,
                    urlType: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });

            return NextResponse.json(contacts);
        };

    } catch (error) {
        console.log('[CONTACTS_GET_ALL_ERROR]', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    };
};