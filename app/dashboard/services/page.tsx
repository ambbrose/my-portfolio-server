import format from "date-fns/format";

import prismadb from "@/lib/prismadb";
import ServiceClient from "./components/client";

const ServicesPage = async () => {

    const services = await prismadb.service.findMany({});

    const formattedServices = services.map((item) => ({
        id: item.id,
        title: item.title,
        active: item.active,
        updatedAt: format(item.updatedAt, 'MMMM do, yyyy'),
        createdAt: format(item.createdAt, 'MMMM do, yyyy')
    }));

    return (
        <div className="flex flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ServiceClient data={formattedServices} />
            </div> 
        </div>
    )
};

export default ServicesPage;