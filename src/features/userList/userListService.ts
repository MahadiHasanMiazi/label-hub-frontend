import UserListService from "../../services/UserListService";

const getAllUsers = async (userPlayload: any) => {
  const response = await UserListService.getAllUserService(
    userPlayload.page,
    userPlayload.limit,
    userPlayload.user_role,
    userPlayload.user_status
  );
  return response.data;
};
const getSingleUser = async (userId: any) => {
  const response = await UserListService.getSingleUserService(userId);
  return response.data;
};
const getAllGroupOfUser = async (params: any) => {
  const response = await UserListService.getAllGroupOfUserService(
    params.userId,
    params.page
  );
  return response.data;
};
const deleteAuser = async (userId: number) => {
  const response = await UserListService.deleteUserService(userId);
  return response.data;
};
const updateAuser = async (userId: number) => {
  const userStatus = {
    status: 2,
  };
  const response = await UserListService.updateStatusUserService(
    userId,
    userStatus
  );
  return response.data;
};
const createAuser = async (userInfo: any) => {
  const response = await UserListService.createNewUserService(userInfo);
  return response.data;
};

const userService = {
  getAllUsers,
  getAllGroupOfUser,
  deleteAuser,
  updateAuser,
  createAuser,
  getSingleUser,
};

export default userService;
