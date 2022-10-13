import { projectCustomFetch } from "../utils/http-common";

const PROJECT_DATA_UPLOAD_API_URL = (projectId: number) =>
  `/api/v1/project/${projectId}/data/upload`;

const projectDataUpload = (data: any, projectId: any, tasks: any) => {
  let params = new FormData();
  params.append("tasks", tasks);
  params.append("file", data);
  return projectCustomFetch.post(
    PROJECT_DATA_UPLOAD_API_URL(projectId),
    params
  );
};

const ProjectsService = {
  projectDataUpload,
};

export default ProjectsService;
