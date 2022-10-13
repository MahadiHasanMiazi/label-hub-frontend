/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { FiDownloadCloud, FiUploadCloud } from "react-icons/fi";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { RootState } from "../../../app/store";
import { BreadCrumbs } from "../../../components/BreadCrumbs/BreadCrumbs";
import { PillBadge } from "../../../components/PillBadge/PillBadge";
import { PaginationCount } from "../../../enums/PaginationEnums";
import { ActionButton } from "./../../../components/Button/ActionButton";
import Spinner from "./../../../components/Spinner/Spinner";
import {
  allGroupOfProject,
  resetGroup,
} from "./../../../features/projectGroup/projectGroupSlice";
import {
  getAProject,
  resetProject,
} from "./../../../features/projectList/projectListSlice";
import { CreateGroup } from "./../Group/CreateGroup/CreateGroup";
import { GroupList } from "./groupList/GroupList";
import { ProjectExport } from "./projectExport/ProjectExport";
import { ProjectExportImport } from "./projectExportImport/ProjectExportImport";
import "./ViewProject.css";

export const ViewProject = () => {
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [uploadShow, setUploadShow] = useState(false);
  const [exportShow, setExportShow] = useState(false);
  const [projectGroupId, setProjectGroupId] = useState<number>();
  const [currentPageNo, setCurrentPageNo] = useState(1);
  const [itemsPerPage] = useState(PaginationCount.GROUP_PERPAGE);
  const [searchText, setSearchText] = useState(""); 
  const handleShowCreateGroup = () => setShowCreateGroup(true);
  const handleShowUploadModal = () => setUploadShow(true);
  const handleShowExportModal = () => setExportShow(true);
  const { projectId } = useParams();
  const { project, isProjectLoading, projectMessage, isProjectError } =
    useSelector((state: RootState) => state.projectList);
  const { projectGroupList, groupMessage, isGroupError } = useSelector(
    (state: RootState) => state.projectGroupList
  );
  const { data: grouplist, total_data_count } = projectGroupList || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //set project id into state
  const projectIdGroupSet = () => {
    setProjectGroupId(parseInt(projectId));
  };

  //getting a project
  useEffect(() => {
    dispatch(getAProject(parseInt(projectId)));
  }, [dispatch, projectId]);
  //getting all groups of a project
  useEffect(() => {
    const groupPayload = {
      currentProjectId: parseInt(projectId),
      currentPage: currentPageNo,
      limit: itemsPerPage,
      searchKey: searchText
    };
    dispatch(allGroupOfProject(groupPayload));
  }, [dispatch, projectId, currentPageNo, searchText]);

  const crumbsLinks = [
    {
      path: "/dashboard",
      name: "Dashboard",
      active: false,
    },
    {
      path: "/dashboard/projects",
      name: "Projects",
      active: false,
    },
    {
      path: "#",
      name: `${project?.name}`,
      active: true,
    },
  ];

  //redirect if group not found
  useEffect(() => {
    if (isGroupError) {
      dispatch(resetGroup());
      //return navigate("/dashboard/projects");
    }
  }, [dispatch, groupMessage, isGroupError]);
  //redirect if project not found
  useEffect(() => {
    if (isProjectError) {
      toast.error(projectMessage);
      dispatch(resetProject());
      return navigate("/dashboard/projects");
    }
  }, [dispatch, projectMessage, isGroupError]);

  if (isProjectLoading) {
    return <Spinner></Spinner>;
  }
  return (
    <>
      <CreateGroup
        show={showCreateGroup}
        setShow={setShowCreateGroup}
        projectId={projectGroupId}
        annotationConfig={project?.annotation_config}
      ></CreateGroup>
      <ProjectExportImport
        show={uploadShow}
        setShow={setUploadShow}
        projectId={projectGroupId}
      ></ProjectExportImport>
      <ProjectExport show={exportShow} setShow={setExportShow}></ProjectExport>
      <section>
        <section className="project-view-header">
          <BreadCrumbs crumbsLinks={crumbsLinks}></BreadCrumbs>
          <div className="project-header-group">
            <div className="project-heading">
              <h4 className="mr-2 view-project-title">{project?.name}</h4>
              <span className=" project-header-status">Running</span>
            </div>
            <div>
              <ActionButton
                onClick={() => {
                  handleShowUploadModal();
                  projectIdGroupSet();
                }}
                className="upload-data-btn mx-2"
              >
                <FiUploadCloud></FiUploadCloud> Upload Data
              </ActionButton>
              <ActionButton
                onClick={() => {
                  handleShowExportModal();
                }}
                className="export-data-btn mx-2"
              >
                <FiDownloadCloud></FiDownloadCloud> Export Data
              </ActionButton>
            </div>
          </div>
        </section>
        <section className="py-3">
          <Row>
            <Col xl={7}>
              <p className="single-project-description">
                {project?.description}
              </p>
              <div className="creator-details">
                <div className="d-flex">
                  <p className="mr-5">
                    Created by: <span>{project?.created_by?.created_by}</span>
                  </p>
                  <p className="mr-5">
                    Created date:{" "}
                    <span>
                      {" "}
                      <Moment format="DD-MM-YYYY">
                        {project.created_at}
                      </Moment>{" "}
                    </span>
                  </p>
                </div>
                <div className="d-flex">
                  <p className="mr-5">
                    No. of annotators: <span>{project?.num_annotators}</span>
                  </p>
                  <p className="mr-5">
                    No. of groups: <span>{project?.num_groups}</span>{" "}
                  </p>
                  <p className="mr-5">
                    No. of validators: <span>{project?.num_validators}</span>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </section>
        <section className="py-3 mx-2">
          <Row>
            <Col >
              <div className="project-annotation-with-tags row">
                {project?.annotation_config?.map((annotation: any) => {
                  return (
                    <Col lg={4} key={annotation.id}>
                      <div className="single-annotation-type-tags ">
                        <h6 className="single-annotation-type-title">
                          {annotation.name}
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip>
                                Annotated data 332 and Assigned data 5000
                              </Tooltip>
                            }
                          >
                            <span className="project-tag-count">
                              (332/5000)
                            </span>
                          </OverlayTrigger>
                        </h6>
                        <div className="selected-tags-badge ">
                          {annotation?.tags.map((tag: any) => {
                            return (
                              <PillBadge
                                key={tag?.id}
                                name={tag?.short_form}
                                className="mx-1"
                              ></PillBadge>
                            );
                          })}
                        </div>
                      </div>
                    </Col>
                  );
                })}
              </div>
            </Col>
          </Row>
        </section>

        <section className="py-3">
          <h4 className="group-list-heading">Groups</h4>
          <GroupList
            grouplist={grouplist}
            totalDataCount={total_data_count}
            handleShowCreateGroup={handleShowCreateGroup}
            projectIdGroupSet={projectIdGroupSet}
            currentPageNo={currentPageNo}
            setCurrentPageNo={setCurrentPageNo}
            setSearchText={setSearchText}
            searchText={searchText}
          ></GroupList>
        </section>
      </section>
    </>
  );
};
