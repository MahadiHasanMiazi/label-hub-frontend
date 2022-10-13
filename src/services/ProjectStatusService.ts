import { projectCustomFetch } from "../utils/http-common";

const PROJECT_STAT_API_URL = 'api/v1/projects/stat';


const getProjectStat = () => {
    return projectCustomFetch.get(PROJECT_STAT_API_URL);
};

const ProjectsStatService = {
    getProjectStat
};

export default ProjectsStatService;

