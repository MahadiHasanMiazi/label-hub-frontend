import NerDataService from "../../services/NerDataService";

const unassignNerData = async (projectId: number) => {

  const response = await NerDataService.getUnassignedNerDatService(projectId);
  return response.data;
};
const assignNerData = async (assignDataPayload: any) => {
  const response = await NerDataService.assignedNerDatService(assignDataPayload);
  return response.data;
};
const nerDataService = {
  unassignNerData,
  assignNerData
};

export default nerDataService;
