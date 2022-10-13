import { projectCustomFetch } from "../utils/http-common";

const GET_ALL_TASK_API_URL = "/api/v1/annotation_tasks/";

const getAllTaskService = () => {
  return projectCustomFetch.get(GET_ALL_TASK_API_URL);
};

const TasksService = {
  getAllTaskService,
};

export default TasksService;
