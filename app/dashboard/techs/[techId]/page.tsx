import prismadb from "@/lib/prismadb";

import TechForm from "./components/tech-form";

const TechPage = async (
    { params }: { params: { techId: string } }
) => {

    const tech = await prismadb.technology.findUnique({
        where: {
            id: params.techId
        }
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8">
                <TechForm 
                    initialData={tech}
                />
            </div>
        </div>
    );
};

export default TechPage;