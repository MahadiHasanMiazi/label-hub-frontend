import { projectCustomFetch } from "../utils/http-common";
import { PaginationCount } from "../enums/PaginationEnums";
const PROJECT_API_URL = "/api/v1/projects/";

const createNewpProjectService = (data: any) => {
  return projectCustomFetch.post(PROJECT_API_URL, data);
};

const getAProjectService = (projectId: any) => {
  return projectCustomFetch.get(PROJECT_API_URL + projectId);
};
const deleteProjectService = (data: any) => {
  return projectCustomFetch.delete(PROJECT_API_URL + data);
};
const updateProjectService = (projectData: any, projectId: number) => {
  return projectCustomFetch.put(PROJECT_API_URL + projectId, projectData);
};
const getAllProjectService = (
  currentPage: number = 1,
  limit: number = PaginationCount.PROJECT_PERPAGE,
  user_role: number = null,
  search_key: any = ""
) => {
  if (user_role > 0) {
    currentPage = 1;
  }

  let queryString = `?page=${currentPage}&limit=${limit}`;

  if (user_role) {
    queryString = `?user_role=${user_role}&page=${currentPage}&limit=${limit}`;
  }
  if (search_key) {
    queryString = `?search_key=${search_key}&page=${currentPage}&limit=${limit}`;
  }
  if (search_key && user_role) {
    queryString = `?search_key=${search_key}&user_role=${user_role}&page=${currentPage}&limit=${limit}`;
  }

  return projectCustomFetch.get(`${PROJECT_API_URL}${queryString}`);
};
const ProjectsService = {
  createNewpProjectService,
  getAllProjectService,
  updateProjectService,
  deleteProjectService,
  getAProjectService,
};

export default ProjectsService;
