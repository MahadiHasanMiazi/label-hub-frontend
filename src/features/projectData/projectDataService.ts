import ProjectDataService from "../../services/ProjectDataService";


const projectDataUpload = async (file: any, projectId:number, tasks: any) => {
    const response = await ProjectDataService.projectDataUpload(file, projectId, tasks);
    return response.data;
};
const projectGroupService = {
    projectDataUpload,
};

export default projectGroupService;
