import { PaginationCount } from "../enums/PaginationEnums";
import { customFetch, projectCustomFetch } from "../utils/http-common";
const USERS_API_URL = "/api/v1/users/";
const USER_GROUP_API_URL = "/api/v1/projects/users/";

const getAllUserService = (
  page: number = 1,
  limit: number = PaginationCount.USER_PERPAGE,
  user_role: number = null,
  user_status: number = null
) => {
  let queryString = `?page=${page}&limit=${limit}`;

  if (user_role) {
    queryString += `&user_role=${user_role}`;
  }
  if (user_status) {
    queryString += `&user_status=${user_status}`;
  }

  return customFetch.get(USERS_API_URL + queryString);
};

const getAllGroupOfUserService = (userId: number, currentPage: any) => {
  const limit = 6;
  if (currentPage <= 0) {
    currentPage = 1;
  }
  return projectCustomFetch.get(
    `${USER_GROUP_API_URL}${userId}/groups/?page=${currentPage}&limit=${limit}`
  );
};

const getSingleUserService = (userId: any) => {
  return customFetch.get(`${USERS_API_URL}${userId}`);
};
const deleteUserService = (data: any) => {
  return customFetch.delete(USERS_API_URL + data);
};
const updateStatusUserService = (data: any, userStatus: any) => {
  return customFetch.put(USERS_API_URL + data, userStatus);
};
const createNewUserService = (data: any) => {
  return customFetch.post(USERS_API_URL, data);
};

const UserListService = {
  getAllUserService,
  deleteUserService,
  updateStatusUserService,
  createNewUserService,
  getAllGroupOfUserService,
  getSingleUserService,
};

export default UserListService;
