import projectsService from "../../services/ProjectListService";

const createAProject = async (projectInfo: any) => {
  const response = await projectsService.createNewpProjectService(projectInfo);
  return response.data;
};
const updateAProject = async (projectData: any, projectId: number) => {
  const response = await projectsService.updateProjectService(
    projectData,
    projectId
  );
  return response.data;
};

const deleteAProject = async (projectId: number) => {
  const response = await projectsService.deleteProjectService(projectId);
  return response.data;
};
const getAProject = async (projectId: number) => {
  const response = await projectsService.getAProjectService(projectId);
  return response.data;
};
const getAllProjects = async (projectPayload: any) => {
  const response = await projectsService.getAllProjectService(
    projectPayload.currentPage,
    projectPayload.limit,
    projectPayload.user_role,
    projectPayload.search_key
  );
  return response.data;
};
const projectListService = {
  createAProject,
  getAllProjects,
  updateAProject,
  deleteAProject,
  getAProject,
};

export default projectListService;
