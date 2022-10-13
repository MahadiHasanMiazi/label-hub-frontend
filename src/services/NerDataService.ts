import { nerCustomFetch } from "../utils/http-common";

const NER_GET_UNASSIGN_DATA_API_URL = "/api/v1/ner/data/unassigned/";
const NER_ASSIGN_DATA_API_URL = "/api/v1/ner/data/assign/";

const getUnassignedNerDatService = (projectId: number) => {
  return nerCustomFetch.get(`${NER_GET_UNASSIGN_DATA_API_URL}${projectId}`);
};
const assignedNerDatService = (assignDataPayload: any) => {
  const { group_id, assign_data_count, project_id } = assignDataPayload;

  const assignedData = {
    group_id,
    assign_data_count,
  };
  return nerCustomFetch.post(
    `${NER_ASSIGN_DATA_API_URL}${project_id}`,
    assignedData
  );
};

const NerDataService = {
  getUnassignedNerDatService,
  assignedNerDatService,
};

export default NerDataService;
