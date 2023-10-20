
import prismadb from "@/lib/prismadb";
import format from "date-fns/format";
import ProjectClient from "./components/client";

const ProjectsPage = async () => {

    const projects = await prismadb.project.findMany({
        where: {
            active: true
        },
        include: {
            images: true
        }
    });

    const formattedProjects = projects.map((item) => ({
        id: item.id,
        title: item.title,
        live_url: item.live_url,
        demo_url: item.demo_url,
        active: item.active,
        live: item.live,
        updatedAt: format(item.updatedAt, 'MMMM do, yyyy'),
        createdAt: format(item.createdAt, 'MMMM do, yyyy')
    }));

    return (
        <div className="flex flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProjectClient data={formattedProjects} />
            </div> 
        </div>
    );
};

export default ProjectsPage;