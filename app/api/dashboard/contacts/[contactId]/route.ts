import { auth, currentUser } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
    request: Request,
    { params }: { params: { contactId: string } }
) {
    const { userId } = auth();
    const user = await currentUser()

    console.log('USER:- ', user)

    try {
        const body = await request.json();

        const {
            title, contact, iconUrl, active, urlType
        } = body;

        if (!userId || user?.emailAddresses[0].emailAddress !== "ambrosearuwa@gmail.com") {
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

        const contac = await prismadb.contact.update({
            where: {
                id: params.contactId
            },
            data: {
                title,
                contact,
                iconUrl,
                active,
                urlType
            }
        });

        return NextResponse.json(contac);

    } catch (error) {
        console.log('[CONTACT-PATCH-ERROR]:- ', error)
        return new NextResponse('Internal Server Error', { status: 500 });
    };
};

export async function DELETE(
    request: Request,
    { params }: { params: { contactId: string } }
) {
    const { userId } = auth();

    const user = await currentUser();
    try {

        if (!userId || user?.emailAddresses[0].emailAddress !== 'ambrosearuwa@gmail.com') {
            return new NextResponse("Unauthenticated", { status: 401 });
        };

        const contact = await prismadb.contact.deleteMany({
            where: {
                id: params.contactId
            }
        });

        return NextResponse.json(contact);

    } catch (error) {
        console.log('[CONTACT-DELETE-ERROR]:- ', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
};