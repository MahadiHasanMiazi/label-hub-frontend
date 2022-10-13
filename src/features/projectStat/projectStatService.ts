import ProjectsStatService from "../../services/ProjectStatusService";


const getProjectStat = async () => {
    const response = await ProjectsStatService.getProjectStat();
    return response.data;
};
const projectStatService = {
    getProjectStat,
};

export default projectStatService;
