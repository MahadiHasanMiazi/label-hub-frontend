import { projectCustomFetch } from "../utils/http-common";
import { PaginationCount } from "../enums/PaginationEnums";

const PROJECT_API_URL = "/api/v1/projects/";
const PROJECT_GROUP_API_URL = "/api/v1/projects/groups/";

const getAllProjectGroupService = (
  projectId: number,
  page: number = 1,
  limit: number = PaginationCount.GROUP_PERPAGE,
  searchKey: string | null = null 
) => {
  let queryString = `?page=${page}&limit=${limit}`;
  if (searchKey) {
    queryString += `&search_key=${searchKey}`;
  }
  return projectCustomFetch.get(
    `${PROJECT_API_URL}${projectId}/groups/` + queryString
  );
};

const getGroup = (projectId: number, groupId: number) => {
  return projectCustomFetch.get(
      `${PROJECT_API_URL}${projectId}/groups/${groupId}`
  );
}
const deleteProjectGroupService = (groupId: number) => {
  return projectCustomFetch.delete(PROJECT_GROUP_API_URL + groupId);
};
const groupLockUnlockService = (lockUnlockData: any) => {
  const { groupId, is_locked } = lockUnlockData;
  const lockUnlock = {
    is_locked: !is_locked,
  };

  return projectCustomFetch.put(
    `${PROJECT_GROUP_API_URL}${groupId}/lock`,
    lockUnlock
  );
};
const groupCreateService = (createData: any) => {
  return projectCustomFetch.post(PROJECT_GROUP_API_URL, createData);
};
const projectGroupService = {
  getAllProjectGroupService,
  deleteProjectGroupService,
  groupLockUnlockService,
  groupCreateService,
  getGroup
};

export default projectGroupService;
