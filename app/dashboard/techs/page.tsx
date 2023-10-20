import format from "date-fns/format";

import prismadb from "@/lib/prismadb";

import TechClient from "./component/client";

const TechsPage = async () => {

    const techs = await prismadb.technology.findMany({
        where: {
            active: true
        }
    });

    const formattedTechs = techs.map((item) => ({
        id: item.id,
        title: item.title,
        active: item.active,
        updatedAt: format(item.updatedAt, 'MMMM do, yyyy'),
        createdAt: format(item.createdAt, 'MMMM do, yyyy')
    }));

    return (
        <div className="flex flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <TechClient data={formattedTechs} />
            </div>
        </div>
    );
};

export default TechsPage;