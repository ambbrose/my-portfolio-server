import format from "date-fns/format";

import prismadb from "@/lib/prismadb";

import ContactsClient from "./components/client";

const ContactsPage = async () => {

    const contacts = await prismadb.contact.findMany({
        where: {
            active: true
        }
    });

    const formattedContacts = contacts.map((item) => ({
        id: item.id,
        title: item.title,
        active: item.active,
        urlType: item.urlType,
        updatedAt: format(item.updatedAt, 'MMMM do, yyyy'),
        createdAt: format(item.createdAt, 'MMMM do, yyyy')
    }));

    return (
        <div className="flex flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ContactsClient data={formattedContacts} />
            </div>
        </div>
    );
};

export default ContactsPage;