import TasksService from "../../services/TasksService";

const getAllTasks = async () => {
  const response = await TasksService.getAllTaskService();
  return response.data;
};

const userService = {
  getAllTasks,
};

export default userService;
